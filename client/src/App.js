import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ChatRooms from './components/ChatRooms';
import Messages from './components/Messages';
import { AuthService } from './services/AuthService';
import './App.css'; // Make sure to include some basic styling

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        {!isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div>
            <p>Welcome, user!</p>
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
