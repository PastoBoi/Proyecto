"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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
      alert('Registro exitoso');
      router.push('/login'); // Redirige a la página de inicio de sesión después de registrarse
    } else if (response.status === 409) {
      alert('El usuario ya existe');
    } else {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Registro</h2>
      <form onSubmit={handleRegister} className="flex flex-col w-80 gap-4">
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
          Registrar
        </button>
      </form>
    </div>
  );
}
