const login = async (nickname) => {
  const response = await fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to login');
  }

  const data = await response.json();
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('nickname', nickname); // Save the nickname
  return data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('nickname'); // Also remove the nickname
};

export const AuthService = { login, logout };
