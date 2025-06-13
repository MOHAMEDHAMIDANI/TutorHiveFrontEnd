// src/services/chatService.js
import axios from 'axios';

const API_BASE = 'http://192.168.18.177:8081/api/v1/'; // Update to your API base URL

export const getChatRooms = (jwtToken) => {
  return axios.get(`${API_BASE}chat/rooms`, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
};

export const getMessages = (chatRoomId, jwtToken) => {
  return axios.get(`${API_BASE}chat/${chatRoomId}/messages`, {
    headers: { Authorization: `Bearer ${jwtToken}` },
  });
};

export const markMessagesRead = (chatRoomId, jwtToken) => {
  return axios.post(
    `${API_BASE}chat/${chatRoomId}/mark-read`,
    {},
    {
      headers: { Authorization: `Bearer ${jwtToken}` },
    }
  );
};
