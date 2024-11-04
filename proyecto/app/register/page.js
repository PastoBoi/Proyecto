"use client";

import { useState, useEffect, useContext  } from 'react';
import { useRouter } from 'next/navigation';
import translations from '../Componentes/traducción';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { language } = useContext(LanguageContext);

  // Función para traducir textos
  const t = (key) => {
    return translations[language][key] || key;
  };


  // Cargar datos desde Local Storage al montar el componente
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      // Opcional: redirigir si el usuario ya está registrado
      // router.push('/dashboard');
    }
  }, [router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      alert(t('registerSuccess'));
      localStorage.setItem('username', username);
      router.push('/login'); // Redirige a la página de inicio de sesión después de registrarse
    } else if (response.status === 409) {
      alert(t('userExists'));
    } else {
      alert(t('registerError'));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold mb-6">{t('header')}</h2>
      <form onSubmit={handleRegister} className="flex flex-col w-full max-w-md gap-4 bg-white p-6 rounded shadow">
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
          {t('registerButton')}
        </button>
      </form>
    </div>
  );
}