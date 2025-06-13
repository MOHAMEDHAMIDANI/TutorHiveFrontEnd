import axiosInstance from "./axiosInstance";

export const createConversation = async (toId) => {
    try {
      const response = await axiosInstance.post(`chat?method=create-convo`, {
        params: {
          toId
        }
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create conversation');
      }
  
      return data.conversationId;
    } catch (err) {
      throw err;
    }
  };