import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';

// Create context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const savedUser = storageService.getCurrentUser();
      if (savedUser) {
        setUser(savedUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      storageService.clearCurrentUser();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    storageService.setCurrentUser(data.user);
    return data;
  };

  const signup = async (userData) => {
    const data = await authService.signup(userData);
    setUser(data.user);
    storageService.setCurrentUser(data.user);
    return data;
  };

  const logout = () => {
    setUser(null);
    storageService.clearCurrentUser();
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook - MUST be exported
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Also export the context itself if needed
export { AuthContext };
