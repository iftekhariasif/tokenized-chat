const login = async (nickname) => {
  try {
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
    return data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

export const AuthService = { login, logout };