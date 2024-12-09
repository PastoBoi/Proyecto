import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, email, password, confirmPassword } = await req.json();

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return new Response('Passwords do not match', { status: 400 });
  }

  // Validar formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response('Invalid email format', { status: 400 });
  }

  // Ruta al archivo JSON
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Verificar si el usuario o el correo ya existen
  const userExists = users.some(user => user.username === username || user.email === email);
  if (userExists) {
    return new Response('User or email already exists', { status: 409 });
  }

  // Hashear la contraseña y guardar el nuevo usuario
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });

  // Guardar los datos actualizados en el archivo JSON
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return new Response('User registered successfully', { status: 200 });
}
