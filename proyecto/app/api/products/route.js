import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Ruta al archivo JSON
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    // Leer el contenido del archivo JSON
    const jsonData = await fs.readFile(filePath, 'utf8');
    const products = JSON.parse(jsonData);

    // Responder con los datos
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al leer el archivo products.json:', error);

    return new Response(
      JSON.stringify({ error: 'Error al leer los datos del producto.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
