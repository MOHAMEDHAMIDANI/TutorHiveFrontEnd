// src/components/ChatApp.jsx
import React, { useState } from 'react';
import ChatRoom from './chatRoom';
import ChatRoomsList from './chatList';

const ChatApp = ({ userId, jwtToken }) => {
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: 1, borderRight: '1px solid #ddd', paddingRight: '20px' }}>
        <ChatRoomsList jwtToken={jwtToken} onSelectChatRoom={setSelectedChatRoom} />
      </div>
      <div style={{ flex: 2, paddingLeft: '20px' }}>
        {selectedChatRoom ? (
          <ChatRoom
            chatRoomId={selectedChatRoom.id}
            userId={userId}
            jwtToken={jwtToken}
          />
        ) : (
          <p>Please select a chat room to start messaging.</p>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
