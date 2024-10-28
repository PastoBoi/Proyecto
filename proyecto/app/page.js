// app/page.js

"use client"; // Asegúrate de que este archivo pueda usar hooks de React

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/login'); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <header className="bg-blue-600 w-full p-4 text-white text-center">
        <h1 className="text-3xl font-semibold">Bienvenido a Mi Aplicación</h1>
      </header>

      <main className="flex flex-col items-center w-full max-w-md p-6 bg-white rounded shadow-md mt-6">
        <h2 className="text-2xl font-semibold">Opciones</h2>
        <button 
          onClick={handleLoginRedirect} 
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
        >
          Iniciar Sesión
        </button>
      </main>
    </div>
  );
}