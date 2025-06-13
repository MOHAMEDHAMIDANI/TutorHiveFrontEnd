import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Layout, List, Avatar, Badge, Input, Spin, message as antMessage, Button } from 'antd';
import moment from 'moment';
import { DownOutlined } from '@ant-design/icons';
// import './ChatApp.css'; // Optional: include custom styles if needed

const { Sider, Content } = Layout;

function ChatApp() {
  const [conversations, setConversations] = useState([]); // Array of { partner, messages, unreadCount }
  const [selectedConversation, setSelectedConversation] = useState(null); // The partner object for the active conversation
  const [messages, setMessages] = useState([]); // Messages for the selected conversation
  const [messageInput, setMessageInput] = useState('');
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [messageQueue, setMessageQueue] = useState([]);
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const pingIntervalRef = useRef(null);
  const fetchIntervalRef = useRef(null);
  const currentUserRef = useRef(null);
  const selectedConversationRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const chatContainerRef = useRef(null);

  // Track if we're intentionally disconnecting
  const intentionalDisconnectRef = useRef(false);
  const registeredRef = useRef(false);

  // Store user in ref to avoid stale closures in event handlers
  useEffect(() => {
    currentUserRef.current = JSON.parse(localStorage.getItem('chat_user'));
  }, []);

  // Keep selectedConversation in ref for stable access in callbacks
  useEffect(() => {
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  // Scroll to bottom smoothly when new messages arrive
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Modify the scroll behavior
  useEffect(() => {
    if (messages.length === 0) return;
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
    const messageContainer = document.querySelector('.messages-container');
      if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    });
  }, [messages]);

  // Remove both existing scroll effects and replace with smarter scrolling logic
  useEffect(() => {
    if (messages.length === 0) return;
    
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    
    // Function to check if user is near bottom of chat
    const isNearBottom = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      // Consider "near bottom" if within 100px of bottom
      return scrollHeight - scrollTop - clientHeight < 100;
    };
    
    // Function to scroll to bottom
    const scrollToBottom = () => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    };
    
    // Only auto-scroll if user is already near the bottom
    // This allows users to read older messages without being forced down
    if (isNearBottom()) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(scrollToBottom);
    }
  }, [messages]);
  
  // Add scroll event listener to show/hide scroll button
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      // Show button if not near bottom
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    };
    
    chatContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      chatContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handler for scroll to bottom button
  const handleScrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  // Fetch conversation list (grouped by partner) from your backend
  const fetchConversations = useCallback(async () => {
    if (!currentUserRef.current) return;
    try {
      setLoadingConversations(true);
      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_CHAT_APP_BACKEND_URL;
      console.log('Fetching conversations for', currentUserRef.current.email);
      
      const response = await fetch(`${apiUrl}/auth/messages/${currentUserRef.current.email}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      
      const data = await response.json();
      console.log('Conversations fetched:', Object.keys(data.conversations || {}).length);
      
      // data is expected to be an object: { userId, conversations: { <partnerId>: { partner, messages } } }
      const convArray = Object.values(data.conversations || {});
      
      // Sort conversations by the timestamp of the last message (newest first)
      convArray.sort((a, b) => {
        const aLast = a.messages[0]?.createdAt || a.messages[0]?.timestamp || 0;
        const bLast = b.messages[0]?.createdAt || b.messages[0]?.timestamp || 0;
        return new Date(bLast) - new Date(aLast);
      });
      
      setConversations(convArray);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    } finally {
      setLoadingConversations(false);
    }
  }, []);

  // Fetch detailed conversation messages using the get-conversation endpoint
  const fetchConversationMessages = useCallback(async (partnerEmail) => {
    if (!currentUserRef.current || !partnerEmail) return;
    
    try {
      setLoadingMessages(true);
      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_CHAT_APP_BACKEND_URL;
      console.log('Fetching messages for conversation with', partnerEmail);
      
      const response = await fetch(`${apiUrl}/auth/get-conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userEmail: currentUserRef.current.email,
          otherUserEmail: partnerEmail,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch conversation messages');
      }
      
      const data = await response.json();
      console.log('Messages fetched:', (data.conversation.messages || []).length);
      
      // data.conversation.messages contains the conversation messages
      setMessages(data.conversation.messages || []);
    } catch (err) {
      console.error('Error fetching conversation messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // Process an incoming message from WebSocket
  const processIncomingMessage = useCallback((data) => {
    console.log('Processing incoming message:', data);
    
    // Skip processing if this is a message we sent
    if (data.senderId === currentUserRef.current?.id) {
      console.log('Skipping our own message from server', data.tempId);
      return;
    }
    
    // Build incoming message object
    const incomingMessage = {
      id: data.id || Date.now(), // Ensure there's always an ID
      content: data.content,
      senderId: data.senderId,
      receiverId: data.receiverId,
      timestamp: data.createdAt || new Date().toISOString(),
      sender: data.sender,
      status: 'received'
    };
    
    // Always update messages if this is the current conversation
    if (
      selectedConversationRef.current &&
      (incomingMessage.senderId === selectedConversationRef.current.id ||
        incomingMessage.receiverId === selectedConversationRef.current.id)
    ) {
      setMessages(prev => {
        // Check if message already exists to avoid duplicates
        const messageExists = prev.some(msg => 
          (msg.id && msg.id === incomingMessage.id) || 
          (msg.content === incomingMessage.content && 
           msg.senderId === incomingMessage.senderId && 
           Math.abs(new Date(msg.timestamp || 0) - new Date(incomingMessage.timestamp || 0)) < 1000)
        );
        
        if (messageExists) return prev;
        return [...prev, incomingMessage];
      });
    }
    
    // Update conversation list
    setConversations(prev => {
      let updated = [...prev];
      
      // Determine partner id based on sender and receiver
      const partnerId = incomingMessage.senderId === currentUserRef.current?.id 
        ? incomingMessage.receiverId 
        : incomingMessage.senderId;
        
      const partnerObject = incomingMessage.senderId === currentUserRef.current?.id 
        ? data.receiver || { id: incomingMessage.receiverId }
        : data.sender || { id: incomingMessage.senderId };
        
      const index = updated.findIndex(conv => conv.partner.id === partnerId);
      
      if (index !== -1) {
        // Existing conversation
        const conv = {...updated[index]};
        
        // Check for duplicate messages
        const messageExists = conv.messages.some(msg => 
          (msg.id && msg.id === incomingMessage.id) || 
          (msg.content === incomingMessage.content && 
           msg.senderId === incomingMessage.senderId && 
           Math.abs(new Date(msg.timestamp || 0) - new Date(incomingMessage.timestamp || 0)) < 1000)
        );
        
        if (!messageExists) {
          // Prepend new message (assuming messages are ordered newest-first in the sidebar)
          conv.messages = [incomingMessage, ...conv.messages];
        
          // If this conversation is not active, increment unread count
          if (!selectedConversationRef.current || selectedConversationRef.current.id !== partnerId) {
            conv.unreadCount = (conv.unreadCount || 0) + 1;
          }
          
          // Replace the conversation in the array
          updated[index] = conv;
          
          // Sort by newest message
          updated.sort((a, b) => {
            const aTime = a.messages[0]?.timestamp || 0;
            const bTime = b.messages[0]?.timestamp || 0;
            return new Date(bTime) - new Date(aTime);
          });
        }
      } else {
        // New conversation
        const newConv = {
          partner: partnerObject,
          messages: [incomingMessage],
          unreadCount: (!selectedConversationRef.current || selectedConversationRef.current.id !== partnerId) ? 1 : 0,
        };
        updated = [newConv, ...updated];
      }
      
      return updated;
    });
  }, []);

  // Add reconnect attempts counter
  const reconnectAttemptsRef = useRef(0);

  // WebSocket connection setup
  const connectWebSocket = useCallback(() => {
    if (!currentUserRef.current) {
      console.log('No current user, cannot connect WebSocket');
      return;
    }
    
    // Don't reconnect if already connecting or already registered
    if (wsRef.current && wsRef.current.readyState === WebSocket.CONNECTING) {
      console.log('WebSocket already connecting, skipping reconnect');
      return;
    }

    if (registeredRef.current && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log('WebSocket already registered and connected, skipping reconnect');
      return;
    }
    
    // Close any existing connection
    if (wsRef.current) {
      try {
        // Mark this as an intentional disconnect to prevent auto-reconnect
        intentionalDisconnectRef.current = true;
        wsRef.current.close();
      } catch (err) {
        console.error('Error closing existing WebSocket:', err);
      }
    }
    
    try {
      console.log('Connecting to WebSocket...');
    const wsUrl = process.env.REACT_APP_CHAT_WS_URL;
      console.log('WebSocket URL:', wsUrl);
      
    wsRef.current = new WebSocket(wsUrl);
      
      // Reset intentional disconnect flag for new connection
      intentionalDisconnectRef.current = false;

    wsRef.current.onopen = () => {
      console.log('WebSocket Connected');
      setWsConnected(true);
        
      // Register current user with the server
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          console.log('Registering user:', currentUserRef.current.email);
      wsRef.current.send(JSON.stringify({
        type: 'register',
            email: currentUserRef.current.email,
          }));
        }
        
        // Send any queued messages
        if (messageQueue.length > 0) {
          console.log('Sending queued messages:', messageQueue.length);
          [...messageQueue].forEach(msg => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
              wsRef.current.send(JSON.stringify(msg));
              
              // Update pending message status to sending
              setMessages(prev => 
                prev.map(existingMsg => 
                  existingMsg.tempId === msg.tempId 
                    ? { ...existingMsg, status: 'sending' }
                    : existingMsg
                )
              );
            }
          });
          
          // Clear the queue
          setMessageQueue([]);
        }
    };

    wsRef.current.onmessage = (event) => {
        let data;
        try {
          data = JSON.parse(event.data);
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
          return;
        }
        
      console.log('WebSocket received:', data);

      switch (data.type) {
        case 'connection_established':
          console.log('Connection confirmed:', data.message);
          break;
            
        case 'registered':
            console.log('User registered with WebSocket server');
          localStorage.setItem('ws_user_id', data.userId);
            registeredRef.current = true; // Mark as registered to prevent unnecessary reconnects
          setIsInitialized(true);
          break;
            
          case 'user status':
            console.log('User status update:', data.userId, data.online ? 'online' : 'offline');
            // Update UI if needed based on user status
            break;
            
        case 'chat message':
            processIncomingMessage(data);
            break;
            
          case 'message sent':
            console.log('Message sent confirmation:', data);
            // Update the pending message status to sent
            setMessages(prev => 
              prev.map(msg => {
                if ((msg.tempId && msg.tempId === data.tempId) || 
                    (msg.id && msg.id === data.tempId)) {
                  return { 
                    ...msg, 
                    id: data.id || msg.id, 
                    status: 'sent', 
                    timestamp: data.createdAt || msg.timestamp 
                  };
                }
                return msg;
              })
            );
            
            // DON'T trigger a fetch here to avoid reloading issues
            // fetchConversations(); - REMOVED
          break;
            
          case 'pong':
            console.log('Ping acknowledged');
          break;
            
        case 'error':
            console.error('Server error:', data.message);
          break;
            
        default:
            console.log('Unknown message type:', data.type);
          break;
      }
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsConnected(false);
    };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected, code:', event.code, 'reason:', event.reason);
        setWsConnected(false);
        
        // DON'T reconnect if:
        // 1. This was an intentional disconnect
        // 2. The code is 1000 (normal closure)
        // 3. The code is 1005 if we're already registered (server-side close after registration)
        if (!intentionalDisconnectRef.current && 
            event.code !== 1000 && 
            !(event.code === 1005 && registeredRef.current)) {
          
          console.log('Scheduling reconnection attempt...');
          
          // Use increasing backoff time to prevent hammering the server
          const backoffTime = Math.min(3000 + (reconnectAttemptsRef.current * 1000), 15000);
          
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('Attempting reconnection...');
            reconnectAttemptsRef.current++;
            connectWebSocket();
          }, backoffTime);
        } else {
          console.log('Not reconnecting - intentional or normal closure');
        }
      };
      
      // Set up ping interval to keep connection alive
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = setInterval(() => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          console.log('Sending ping to keep connection alive');
          wsRef.current.send(JSON.stringify({ type: 'ping' }));
        }
      }, 20000);
    } catch (err) {
      console.error('Error setting up WebSocket:', err);
      setWsConnected(false);
      
      // Try again after delay, but only if not a persistent issue
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectAttemptsRef.current++;
        connectWebSocket();
      }, 5000);
    }
  }, [messageQueue, processIncomingMessage, fetchConversations]);

  // Function to send a message
  const sendMessage = useCallback((content) => {
    if (!content.trim()) return;
    if (!selectedConversationRef.current) {
      console.warn('No conversation selected');
      return;
    }
    
    // Prevent duplicate sends with debounce
    if (window.lastSendTime && Date.now() - window.lastSendTime < 1000) {
      console.log('Preventing duplicate send, too soon');
      return;
    }
    window.lastSendTime = Date.now();
    
    console.log('Sending message to:', selectedConversationRef.current.id);
    
    const tempId = `temp-${Date.now()}`;
    const messageData = {
      type: 'chat message',
      senderId: currentUserRef.current?.id,
      receiverId: selectedConversationRef.current.id,
      content: content.trim(),
      tempId: tempId,
    };
    
    // Create temporary message for UI
      const tempMessage = {
      tempId: tempId,
        content: content.trim(),
      senderId: currentUserRef.current?.id,
      receiverId: selectedConversationRef.current.id,
        timestamp: new Date().toISOString(),
        status: 'pending',
      sender: currentUserRef.current,
    };
    
    // Add message to UI immediately
    setMessages(prev => {
      // Check first if similar message exists to prevent duplicates
      const isDuplicate = prev.some(msg => 
        msg.content === content.trim() && 
        msg.senderId === currentUserRef.current?.id &&
        Date.now() - new Date(msg.timestamp).getTime() < 5000
      );
      
      if (isDuplicate) {
        console.log('Preventing duplicate message');
        return prev;
      }
      return [...prev, tempMessage];
    });
    
    // Also update conversation list
    setConversations(prev => {
      const updated = [...prev];
      const index = updated.findIndex(conv => 
        conv.partner.id === selectedConversationRef.current.id
      );
      
      if (index !== -1) {
        const conv = {...updated[index]};
        
        // Check for duplicate
        const isDuplicate = conv.messages.some(msg => 
          msg.content === content.trim() && 
          msg.senderId === currentUserRef.current?.id &&
          Date.now() - new Date(msg.timestamp || 0).getTime() < 5000
        );
        
        if (isDuplicate) {
          return prev;
        }
        
        conv.messages = [tempMessage, ...conv.messages];
        updated[index] = conv;
        
        // Move to top
        updated.sort((a, b) => {
          const aTime = a.messages[0]?.timestamp || 0;
          const bTime = b.messages[0]?.timestamp || 0;
          return new Date(bTime) - new Date(aTime);
        });
        
        return updated;
      }
      return prev;
    });
    
    // Send message if connected, otherwise queue
    try {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        console.log('Sending message via WebSocket');
      wsRef.current.send(JSON.stringify(messageData));
      } else {
        console.log('WebSocket not connected, queueing message');
        setMessageQueue(prev => [...prev, messageData]);
        
        // Try to reconnect WebSocket
        connectWebSocket();
      }
    } catch (err) {
      console.error('Error sending message:', err);
      // Queue message for retry
      setMessageQueue(prev => [...prev, messageData]);
    }
    
    // Clear input
    setMessageInput('');
  }, [connectWebSocket]);

  // Handle conversation selection
  const handleSelectConversation = useCallback((conversation) => {
    console.log('Selecting conversation with:', conversation.partner.username);
    setSelectedConversation(conversation.partner);
    
    // Clear unread count
    setConversations(prev =>
      prev.map(conv => {
        if (conv.partner.id === conversation.partner.id) {
          return { ...conv, unreadCount: 0 };
        }
        return conv;
      })
    );
    
    // Fetch messages for this conversation
    fetchConversationMessages(conversation.partner.email);
  }, [fetchConversationMessages]);

  // Format message time for display
  const formatMessageTime = useCallback((timestamp) => {
    if (!timestamp) return '';
    
    try {
    const messageDate = moment(timestamp);
    const now = moment();

    if (messageDate.isSame(now, 'day')) {
        // Today
      return messageDate.format('h:mm A');
      } else if (messageDate.isSame(now.clone().subtract(1, 'day'), 'day')) {
        // Yesterday
      return 'Yesterday ' + messageDate.format('h:mm A');
    } else if (messageDate.isSame(now, 'week')) {
        // This week
      return messageDate.format('ddd h:mm A');
    } else {
        // Older
      return messageDate.format('MMM D, h:mm A');
      }
    } catch (err) {
      console.error('Error formatting timestamp:', err);
      return '';
    }
  }, []);

  // Initialize chat on component mount
  useEffect(() => {
    console.log('Initializing chat component');
    
    // Reset attempts counter on mount
    reconnectAttemptsRef.current = 0;
    registeredRef.current = false;
    
    // Initial data fetch
    fetchConversations();
    
    // Connect WebSocket
    connectWebSocket();

    // Set up periodic fetch to ensure we catch any missed messages
    // Reduce frequency to avoid excessive reloads and use debounce-like approach
    clearInterval(fetchIntervalRef.current);
    fetchIntervalRef.current = setInterval(() => {
      const now = Date.now();
      // Only do periodic refresh if no user activity in last 15 seconds
      if (now - (window.lastUserActivity || 0) > 15000) { 
        console.log('Running periodic data refresh');
        fetchConversations();
        
        if (selectedConversationRef.current?.email) {
          fetchConversationMessages(selectedConversationRef.current.email);
        }
      }
    }, 30000); // Every 30 seconds instead of 10
    
    // Track user activity
    const trackActivity = () => { window.lastUserActivity = Date.now(); };
    window.addEventListener('click', trackActivity);
    window.addEventListener('keydown', trackActivity);
    
    // Cleanup on unmount
    return () => {
      console.log('Cleaning up chat component');
      clearInterval(fetchIntervalRef.current);
      clearInterval(pingIntervalRef.current);
      clearTimeout(reconnectTimeoutRef.current);
      window.removeEventListener('click', trackActivity);
      window.removeEventListener('keydown', trackActivity);
      
      if (wsRef.current) {
        try {
          intentionalDisconnectRef.current = true; // Mark as intentional for clean disconnect
          wsRef.current.close(1000, "Component unmounted");
        } catch (err) {
          console.error('Error closing WebSocket on unmount:', err);
        }
      }
    };
  }, [fetchConversations, connectWebSocket, fetchConversationMessages]);

  return (
    <Layout className="h-[calc(90vh-64px)] mt-16"> {/* Fixed height for chat container */}
      {/* Sidebar */}
      <Sider 
        width={300} 
        className="bg-white border-r border-gray-200"
        style={{ 
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-semibold">Messages</h2>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <div className={`w-2 h-2 rounded-full mr-2 ${wsConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            {wsConnected ? 'Connected' : 'Connecting...'}
          </div>
        </div>

        {/* Conversations List */}
        <div 
          className="overflow-y-auto custom-scrollbar bg-white"
          style={{ 
            height: 'calc(100% - 65px)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {loadingConversations ? (
            <div className="flex justify-center p-4">
              <Spin />
            </div>
          ) : conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500">
              <p>No conversations yet</p>
            </div>
          ) : (
            <List
              className="divide-y divide-gray-200"
              dataSource={conversations}
              renderItem={conversation => (
                <div
                  onClick={() => handleSelectConversation(conversation)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.partner.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Badge count={conversation.unreadCount} offset={[-2, 2]}>
                      <Avatar 
                        size={40} 
                        src={conversation.partner.avatarUrl}
                        className="bg-blue-500"
                      >
                        {conversation.partner.username?.[0]?.toUpperCase()}
                      </Avatar>
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {conversation.partner.username}
                        </p>
                        {conversation.messages[0] && (
                          <p className="text-xs text-gray-500">
                            {moment(conversation.messages[0].createdAt || conversation.messages[0].timestamp).fromNow()}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.messages[0]?.content || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            />
          )}
        </div>
      </Sider>

      {/* Main Chat Area */}
      <Content className="flex flex-col bg-gray-50 relative"> {/* Added relative positioning */}
        {selectedConversation ? (
          <>
            {/* Chat Header - Fixed at top */}
            <div className="p-3 bg-white border-b border-gray-200 shadow-sm">
              <div className="flex items-center space-x-3">
                <Avatar 
                  size={36} 
                  src={selectedConversation.avatarUrl}
                  className="bg-blue-500"
                >
                  {selectedConversation.username?.[0]?.toUpperCase()}
                </Avatar>
                <div>
                  <h2 className="text-base font-semibold">{selectedConversation.username}</h2>
                  <p className="text-xs text-gray-500">
                    {wsConnected ? 'Online' : 'Connecting...'}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area - Scrollable container */}
            <div 
              ref={chatContainerRef}
              className="messages-container flex-1 overflow-y-auto p-4 space-y-3"
              style={{ 
                height: 'calc(100% - 120px)', // Adjust for header and input heights
                overflowY: 'auto',
                scrollBehavior: 'smooth',
                paddingBottom: '60px' // Add padding to show messages above input
              }}
            >
              {loadingMessages ? (
                <div className="flex justify-center p-4">
                  <Spin />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
              <div className="flex flex-col space-y-3">
                {messages
                    .sort((a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0))
                  .map((message, index) => (
                    <div
                        key={message.id || message.tempId || index}
                        className={`flex ${message.senderId === currentUserRef.current?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-3 py-2 ${
                            message.senderId === currentUserRef.current?.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-900'
                        } shadow-sm`}
                      >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div className="flex items-center justify-end space-x-1 mt-1">
                          <span className="text-[10px] opacity-75">
                            {formatMessageTime(message.timestamp)}
                          </span>
                            {message.senderId === currentUserRef.current?.id && (
                            <span className="text-[10px]">
                                {message.status === 'pending' ? '⌛' : message.status === 'sending' ? '↗️' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              )}
              
              {/* Scroll to bottom button */}
              {showScrollButton && (
                <Button
                  type="primary"
                  shape="circle"
                  icon={<DownOutlined />}
                  size="large"
                  onClick={handleScrollToBottom}
                  className="scroll-to-bottom-btn"
                  style={{
                    position: 'absolute',
                    bottom: '80px',
                    right: '20px',
                    opacity: 0.8,
                    zIndex: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                />
              )}
            </div>

            {/* Message Input - Fixed at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200">
              <Input.Search
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onSearch={(value) => {
                  // Only call sendMessage from here to avoid duplicate sends
                  if (value.trim()) sendMessage(value);
                }}
                enterButton="Send"
                placeholder="Type a message..."
                className="rounded-lg"
                disabled={false}
              />
              {messageQueue.length > 0 && (
                <div className="text-xs text-orange-500 mt-1">
                  {messageQueue.length} message(s) queued to send when connected
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-lg font-medium">Select a conversation to start chatting</p>
          </div>
        )}
      </Content>
    </Layout>
  );
}

// Add these styles to your CSS
const styles = `
  .messages-container::-webkit-scrollbar {
    width: 6px;
  }

  .messages-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .messages-container::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  .messages-container::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .messages-container {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
  }
`;

// Add the styles to the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ChatApp;
