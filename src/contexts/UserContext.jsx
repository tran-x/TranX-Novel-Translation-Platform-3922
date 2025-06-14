import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const savedUser = localStorage.getItem('tranx_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('tranx_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tranx_user');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('tranx_user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      logout,
      updateUser,
      loading,
      isLoggedIn: !!user,
      isAdmin: user?.role === 'admin',
      isTranslator: user?.role === 'translator' || user?.role === 'admin',
    }}>
      {children}
    </UserContext.Provider>
  );
};