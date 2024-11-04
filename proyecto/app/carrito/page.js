"use client";

import React from 'react';
import withAuth from '../hoc/withAuth';

function CartPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://www.concierto.cl/wp-content/uploads/2018/09/Obsolete_CDs.jpg')" }}>
      <div className="box-border bg-blue-300 bg-opacity-80 p-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Carrito</h2>
        {/* Contenido del carrito */}
        <p>Contenido exclusivo para usuarios autenticados.</p>
      </div>
    </div>
  );
}

export default withAuth(CartPage);