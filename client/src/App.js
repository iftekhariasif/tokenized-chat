import React, { useState } from 'react';
import { AuthService } from './services/AuthService';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (nickname) => {
    try {
      const { access_token } = await AuthService.login(nickname);
      setUser({ nickname, access_token });
      // Optionally, save the token in localStorage or context
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="App">
      {!user ? <Login onLogin={handleLogin} /> : <div>Welcome, {user.nickname}!</div>}
    </div>
  );
}

export default App;
