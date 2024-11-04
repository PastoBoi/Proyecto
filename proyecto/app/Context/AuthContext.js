// context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null: verificando, false: no autenticado, objeto: autenticado

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include', // Incluir cookies en la solicitud
        });

        if (res.ok) {
          const data = await res.json();
          setUser({ username: data.username });
        } else {
          setUser(false);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(false);
      }
    };

    fetchUser();
  }, []);

  const login = () => {
    // El estado de usuario se actualizará al verificar la cookie
    // Puedes agregar lógica adicional si es necesario
  };

  const logout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
