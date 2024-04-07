const login = async (nickname) => {
  const response = await fetch('http://localhost:4000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname }),
  });
  if (!response.ok) throw new Error('Failed to login');
  const data = await response.json();
  return data;
};

export const AuthService = {
  login,
};
