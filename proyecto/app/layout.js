// /app/layout.js

import './globals.css';
import { LanguageProvider } from './Componentes/languageContext';
import { CartProvider } from './carrito/CartContext'; // Importar CartProvider
import Header from './Header/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>  
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
