// app/middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export function middleware(req) {
  const token = req.cookies.get('session_token'); // Obtén el token de la cookie

  if (token) {
    try {
      // Verificar el JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adjuntar la información del usuario al request para que esté disponible en las páginas
      req.user = decoded;  // El payload contiene información como el userId

      return NextResponse.next();  // Si el token es válido, continúa con la solicitud
    } catch (error) {
      console.error('Token inválido o expirado');
      return NextResponse.redirect('/login');  // Redirige al login si el token no es válido
    }
  } else {
    return NextResponse.redirect('/login');  // Redirige si no hay token
  }
}

export const config = {
  matcher: ['/dashboard', '/profile', '/restricted'], // Especifica las rutas que quieres proteger
};
