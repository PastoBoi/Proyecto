// app/page.js

"use client";

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { LanguageContext } from './Componentes/languageContext';
import translations from './Componentes/traducción';

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
      className="back flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
      
      }}
    >
      <div className="image-box box-border items-center flex flex-col p-4 rounded-xl" style={{
        backgroundImage: "url('https://www.concierto.cl/wp-content/uploads/2018/09/Obsolete_CDs.jpg')",
      }}>
        <div className="box box-border items-center flex flex-col p-4 rounded-xl">
          <h2 className="welcome text-3xl font-semibold mt-4 text-white-900">
            {t('welcome')}
          </h2>
          <div className="mt-4 text-2xl">
            <button
              onClick={handleLoginRedirect}
              className="Log-user py-2 px-4 rounded"
            >
              {t('login')}
            </button>
            <button
              onClick={handleRegisterRedirect}
              className="Create-user py-2 px-4 rounded"
            >
              {t('createUser')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}