"use client";

import { useState, useEffect } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState('ES');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'ES' ? 'EN' : 'ES';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return { language, toggleLanguage };
}