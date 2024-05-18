// src/context/authContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromCookies = Cookies.get('token');
    if (tokenFromCookies) {
      setToken(tokenFromCookies);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
