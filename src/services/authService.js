const API_URL = 'https://13.60.9.115:5000/api';

export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    return { user: data.user, token: data.token };
  },

  async signup(userData) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }
    
    const data = await response.json();
    return { user: data.user, token: data.token };
  },

  async validateToken(token) {
    const response = await fetch(`${API_URL}/auth/validate`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Invalid token');
    
    const data = await response.json();
    return data.user;
  }
};
export default authService;