// /app/page.js

"use client";

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-semibold mt-6">Bienvenido a Sustainable Sound</h2>
      <div className="mt-4">
        <button 
          onClick={handleLoginRedirect} 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
        >
          Iniciar Sesión
        </button>
        <button 
          onClick={handleRegisterRedirect} 
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Crear Usuario
        </button>
      </div>
    </div>
  );
}
