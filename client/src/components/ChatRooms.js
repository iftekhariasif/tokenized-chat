import React, { useState, useEffect } from 'react';
import { ChatRoomService } from '../services/ChatRoomService';

const ChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const data = await ChatRoomService.getChatRooms();;
        setChatRooms(data);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <div>
      <h2>Chat Rooms</h2>
      {chatRooms.length > 0 ? (
        <ul>
          {chatRooms.map((chatRoom) => (
            <li key={chatRoom.id}>{chatRoom.name}</li>
          ))}
        </ul>
      ) : (
        <p>No chat rooms available.</p>
      )}
    </div>
  );
};

export default ChatRooms;
