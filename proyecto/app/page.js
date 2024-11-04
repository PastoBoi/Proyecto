// app/page.js

"use client";

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { LanguageContext } from '../Componentes/LanguageContext';
import translations from '../Componentes/traducción';

export default function HomePage() {
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  // Función para traducir textos
  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://www.concierto.cl/wp-content/uploads/2018/09/Obsolete_CDs.jpg')",
      }}
    >
      <div className="box-border bg-blue-300 items-center flex flex-col p-4 rounded-xl">
        <h2 className="text-3xl font-semibold mt-4 text-blue-900">
          {t('welcome')}
        </h2>
        <div className="mt-4 text-2xl">
          <button
            onClick={handleLoginRedirect}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
          >
            {t('login')}
          </button>
          <button
            onClick={handleRegisterRedirect}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            {t('createUser')}
          </button>
        </div>
      </div>
    </div>
  );
}