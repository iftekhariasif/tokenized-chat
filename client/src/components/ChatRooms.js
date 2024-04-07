import React, { useState, useEffect } from 'react';
import { ChatRoomService } from '../services/ChatRoomService';

const ChatRooms = ({ onJoinChatRoom }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const fetchChatRooms = async () => {
    try {
      const rooms = await ChatRoomService.getChatRooms();
      setChatRooms(rooms);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      await ChatRoomService.createChatRoom(newRoomName);
      fetchChatRooms(); // Refresh list after creation
      setNewRoomName(''); // Reset input field
    } catch (error) {
      console.error('Error creating chat room:', error);
    }
  };

  return (
    <div>
      <h2>Chat Rooms</h2>
      <form onSubmit={handleCreateRoom}>
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="New room name"
          required
        />
        <button type="submit">Create Room</button>
      </form>
      {chatRooms.length > 0 ? (
        <ul>
          {chatRooms.map((chatRoom) => (
            <li key={chatRoom.id}>
              {chatRoom.name}
              <button onClick={() => onJoinChatRoom(chatRoom.id)}>Join</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chat rooms available.</p>
      )}
    </div>
  );
};

export default ChatRooms;
