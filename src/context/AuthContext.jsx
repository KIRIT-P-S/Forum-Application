import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading] = useState(false);

  const login = async (email, password) => {
    const response = await fetch('https://forum-application-backend-4xp5.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('forum_token', data.token);
    localStorage.setItem('forum_current_user', JSON.stringify(data.user));
    return data;
  };

  const signup = async (userData) => {
    const response = await fetch('https://forum-application-backend-4xp5.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    setUser(data.user);
    localStorage.setItem('forum_token', data.token);
    localStorage.setItem('forum_current_user', JSON.stringify(data.user));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('forum_token');
    localStorage.removeItem('forum_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
