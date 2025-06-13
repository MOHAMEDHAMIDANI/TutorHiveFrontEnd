// src/components/ChatRoom.jsx
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { getMessages } from './chatServices';

const ChatRoom = ({ chatRoomId, userId, jwtToken }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef(null);

  // Connect to the WebSocket on mount
  useEffect(() => {
    socketRef.current = io('http://localhost:3000/chat', {
      transports: ['websocket'],
      query: { userId },
      extraHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    socketRef.current.on('connect', () => {
      console.log('Connected to chat server');
    });

    // Listen for incoming messages
    socketRef.current.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId, jwtToken]);

  // Fetch chat history whenever chatRoomId changes
  useEffect(() => {
    getMessages(chatRoomId, jwtToken)
      .then((response) => setMessages(response.data))
      .catch((error) => console.error('Error fetching messages', error));
  }, [chatRoomId, jwtToken]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current) return;

    const payload = {
      chatRoomId,
      content: newMessage,
      senderId: userId,
    };

    // Emit the message over WebSocket
    socketRef.current.emit('sendMessage', payload);

    // Optionally update the UI immediately
    setMessages((prev) => [...prev, { ...payload, id: Date.now() }]);
    setNewMessage('');
  };

  return (
    <div>
      <h3>Chat Room {chatRoomId}</h3>
      <div
        style={{
          border: '1px solid #ccc',
          height: '300px',
          overflowY: 'scroll',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.senderId === userId ? 'right' : 'left',
              margin: '5px 0',
            }}
          >
            <strong>{msg.senderId === userId ? 'Me' : 'Other'}: </strong>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          placeholder="Type your message..."
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ width: '80%' }}
        />
        <button onClick={sendMessage} style={{ width: '18%', marginLeft: '2%' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
