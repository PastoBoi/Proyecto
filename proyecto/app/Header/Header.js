// /app/Header.js

"use client";

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { LanguageContext } from '../Componentes/languageContext';
import translations from '../Componentes/traducción';

export default function Header() {
  const router = useRouter();
  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleHomeRedirect = () => {
    router.push('/');
  };

  const handleCartRedirect = () => {
    router.push('/carrito');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <header className="bg-blue-300 p-4 text-blue-900 flex flex-col md:flex-row justify-between items-center">
      <button className="text-2xl font-bold mb-2 md:mb-0" onClick={handleHomeRedirect}>
        {t('sustainableSound')}
      </button>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <button
          className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-blue-600"
          onClick={handleCartRedirect}
        >
          🛒 {t('cart')}
        </button>
        <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-blue-600">
          📢 {t('promotions')}
        </button>
        <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-blue-600">
          🎵 {t('newDiscs')}
        </button>
        <button
          className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-blue-600"
          onClick={toggleLanguage}
        >
          {language === 'es' ? 'Idioma: Español' : 'Language: English'}
        </button>
      </div>
    </header>
  );
}