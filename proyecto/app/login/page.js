// app/login/page.js

"use client";

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { LanguageContext } from '../Componentes/languageContext';
import translations from '../Componentes/traducción';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  // Función para traducir textos
  const t = (key) => {
    return translations[language][key] || key;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      alert(t('loginSuccess'));
      router.push('/'); // Redirige a la página principal después de iniciar sesión
    } else {
      alert(t('loginError'));
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://www.concierto.cl/wp-content/uploads/2018/09/Obsolete_CDs.jpg')",
      }}
    >
      <div className="box-border bg-blue-300 bg-opacity-80 p-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">{t('loginPageTitle')}</h2>
        <form onSubmit={handleLogin} className="flex flex-col w-80 gap-4">
          <label className="flex flex-col">
            {t('username')}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="p-2 border rounded mt-1 text-black"
              placeholder={t('username')}
            />
          </label>
          <label className="flex flex-col">
            {t('password')}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border rounded mt-1 text-black"
              placeholder={t('password')}
            />
          </label>
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            {t('loginButton')}
          </button>
        </form>
      </div>
    </div>
  );
}