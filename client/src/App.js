// src/App.js

import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ChatRooms from './components/ChatRooms';
import Messages from './components/Messages';
import { AuthService } from './services/AuthService';
import './App.css'; // Assuming you have some basic CSS for layout

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState(''); // State for storing nickname

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedNickname = localStorage.getItem('nickname');
    if (token) {
      setIsLoggedIn(true);
      setNickname(storedNickname); // Retrieve nickname from local storage
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setNickname(localStorage.getItem('nickname')); // Update nickname state on login
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setNickname(''); // Clear nickname state on logout
  };

  return (
    <div className="app-container">
      <div className="app-header">
        {!isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div>
            <p>Welcome, {nickname}</p> {/* Display nickname */}
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      {isLoggedIn && (
        <div className="app-content">
          <div className="chat-rooms">
            <ChatRooms />
          </div>
          <div className="messages">
            <Messages />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
