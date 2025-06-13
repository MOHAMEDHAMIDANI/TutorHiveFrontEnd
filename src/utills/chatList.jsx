// src/components/ChatRoomsList.jsx
import React, { useState, useEffect } from 'react';
import { getChatRooms } from './chatServices';
 
const ChatRoomsList = ({ jwtToken, onSelectChatRoom }) => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    getChatRooms(jwtToken)
      .then((response) => setChatRooms(response.data))
      .catch((error) => console.error('Error fetching chat rooms', error));
  }, [jwtToken]);

  return (
    <div>
      <h2>My Chats</h2>
      <ul>
        {chatRooms.map((room) => (
          <li
            key={room.id}
            onClick={() => onSelectChatRoom(room)}
            style={{ cursor: 'pointer', marginBottom: '8px' }}
          >
            {room.name ||
              `Chat with ${room.tutor?.name || room.student?.name || 'Participant'}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomsList;
