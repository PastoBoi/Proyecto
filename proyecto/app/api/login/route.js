import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, password } = await req.json();
  
  // Ruta al archivo JSON
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Buscar el usuario en el archivo JSON
  const user = users.find(user => user.username === username);
  if (!user) {
    return new Response('Invalid credentials', { status: 401 });
  }

  // Comparar la contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    return new Response('Login successful', { status: 200 });
  } else {
    return new Response('Invalid credentials', { status: 401 });
  }
}
