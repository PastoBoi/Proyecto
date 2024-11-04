import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET); // Asegúrate de definir esta variable en .env.local

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Definir rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/register', '/api/'];

  // Si la ruta es pública, permitir acceso
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Obtener el token de las cookies
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // Redirigir a la página de inicio si no hay token
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  try {
    // Verificar el token usando jose
    await jwtVerify(token, SECRET_KEY);
    return NextResponse.next();
  } catch (error) {
    // Redirigir a la página de inicio si el token es inválido
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/cart/:path*', '/dashboard/:path*', '/protected/:path*'], // Rutas protegidas
};