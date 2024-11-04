import React, { createContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'TU_CLAVE_SECRETA'; // Debes guardar esto en variables de entorno

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si hay un token en Local Storage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.verify(token, SECRET_KEY);
        setUser({ username: decoded.username });
      } catch (error) {
        console.error('Invalid token');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwt.decode(token);
    setUser({ username: decoded.username });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};