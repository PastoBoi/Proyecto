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
    <header className="bg-blue-300 p-4 text-blue-900 flex justify-between items-center">
      <button className="text-2xl font-bold" onClick={handleHomeRedirect}>
        {t('sustainableSound')}
      </button>
      <div className="flex gap-4">
        <button onClick={handleCartRedirect}>
          🛒 {t('cart')}
        </button>
        <button>
          📢 {t('promotions')}
        </button>
        <button>
          🎵 {t('newDiscs')}
        </button>
        <button onClick={toggleLanguage}>
          {language === 'es' ? 'Idioma: Español' : 'Language: English'}
        </button>
      </div>
    </header>
  );
}