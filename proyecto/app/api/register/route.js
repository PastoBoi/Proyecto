import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, password } = await req.json();
  
  // Ruta al archivo JSON
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Verificar si el usuario ya existe
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return new Response('User already exists', { status: 409 });
  }

  // Hashear la contraseña y agregar el nuevo usuario
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  
  // Guardar el usuario en el archivo JSON
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return new Response('User registered successfully', { status: 200 });
}
