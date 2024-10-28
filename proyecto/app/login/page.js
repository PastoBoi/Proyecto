// app/login/page.js

"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-red-950 flex flex-col gap-4 box-border p-4 border-4 rounded-md border-red-950">
      <h2 className="text-xl font-semibold text-center">Iniciar Sesión</h2>
      
      <label className="flex flex-col">
        <span>Usuario</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="text-black border p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </label>
      
      <label className="flex flex-col">
        <span>Contraseña</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="text-black border p-2 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </label>
      
      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Iniciar sesión
      </button>
    </form>
  );
}