import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import { AuthService }  from './services/AuthService';

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
    <div>
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <p>Welcome, user!</p>
          <button onClick={handleLogout}>Logout</button>
          {/* Place for chat components or other features */}
        </div>
      )}
    </div>
  );
};

export default App;