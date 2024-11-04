"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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
      alert('Inicio de sesión exitoso');
      router.push('/'); // Redirige a la página principal después de iniciar sesión
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('https://www.concierto.cl/wp-content/uploads/2018/09/Obsolete_CDs.jpg')]">
      <h2 className="text-3xl font-bold mb-6">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="flex flex-col w-80 gap-4">
        <label>
          Usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-2 border rounded text-black"
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border rounded text-black"
          />
        </label>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
