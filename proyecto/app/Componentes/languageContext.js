// Componentes/LanguageContext.js
"use client";

import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const LanguageContext = createContext();

// Crear el proveedor del contexto
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es'); // Idioma por defecto: Español

  // Cargar el idioma desde Local Storage al montar el componente
  useEffect(() => { 
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Guardar el idioma en Local Storage cuando cambia
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  // Función para cambiar el idioma
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'es' ? 'en' : 'es'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};