const API_URL = "http://localhost:4000";

const getChatRooms = async () => {
  const response = await fetch(`${API_URL}/chat-rooms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch chat rooms');
  }
  return await response.json();
};

// Note: Assuming the backend infers the creator from the auth token, no need for creatorId
const createChatRoom = async (name) => {
  const response = await fetch(`${API_URL}/chat-rooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create chat room');
  }
  return await response.json();
};

const deleteChatRoom = async (roomId) => {
  const response = await fetch(`${API_URL}/chat-rooms/${roomId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete chat room');
  }
  return await response.json();
};

export const ChatRoomService = {
  getChatRooms,
  createChatRoom,
  deleteChatRoom,
};
