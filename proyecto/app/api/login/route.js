import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import * as cookie from 'cookie';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    const { identifier, password } = await req.json();

    // Ruta al archivo JSON
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    let users;

    try {
      users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (err) {
      console.error('Error al leer el archivo de usuarios:', err);
      return new Response('Error al leer el archivo de usuarios', { status: 500 });
    }

    const user = users.find(
      (user) => user.username === identifier || user.email === identifier
    );

    if (!user) {
      console.error('Usuario no encontrado');
      return new Response('Invalid credentials', { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Contraseña incorrecta');
      return new Response('Invalid credentials', { status: 401 });
    }

    // Generar el token con JWT
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Establecer la cookie de sesión
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Asegúrate de usar HTTPS en producción
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    };

    return new Response(JSON.stringify({ username: user.username }), {
      status: 200,
      headers: {
        'Set-Cookie': cookie.serialize('session_token', token, cookieOptions),
      },
    });
  } catch (error) {
    console.error('Error durante el login:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
