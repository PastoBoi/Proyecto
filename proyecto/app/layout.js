// /app/layout.js

import './globals.css';
import { LanguageProvider } from './Componentes/languageContext';
import { CartProvider } from './carrito/page'; // Importar CartProvider
import Header from './Header/1';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider> {/* Envolver con CartProvider */}
          <LanguageProvider>
            <Header />
            <main>{children}</main>
          </LanguageProvider>
        </CartProvider>
      </body>
    </html>
  );
}
