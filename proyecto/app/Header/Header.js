// /app/Header.js

"use client";

import {useRouter} from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [language, setLanguage] = useState("es"); // Define un valor predeterminado para el idioma
  const [isMounted, setIsMounted] = useState(false);

  const handleHomeRedirect = () => {
    router.push('/');
  };

  const handleCartRedirect = () => {
    router.push('/carrito')
  }

  useEffect(() => {
    setIsMounted(true);
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('language', language);
    }
  }, [language, isMounted]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'es' ? 'en' : 'es'));
  };

  return (
    <header className="bg-blue-300 p-4 text-blue-900 flex justify-between items-center">
      <button className="text-2xl font-bold" onClick={handleHomeRedirect}>Sustainable Sound</button>
      <div className="flex gap-4">
        <button>
          <a href="Carrito.html">🛒 Carrito de Compras</a>
        </button>
        <button>📢 Promociones</button>
        <button>🎵 Discos Nuevos</button>
        <button onClick={toggleLanguage}>
          {language === 'es' ? 'Idioma: Español' : 'Language: English'}
        </button>
      </div>
    </header>
  );
}
