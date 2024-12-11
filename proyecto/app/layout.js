// /app/layout.js

import './globals.css';
import { LanguageProvider } from './Componentes/languageContext';
import { CartProvider } from './carrito/CartContext'; // Importar CartProvider
import { AuthProvider } from './Componentes/authContext';
import Header from './Header/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <CartProvider>
            <AuthProvider>
              <Header />
                <main>{children}</main>
            </AuthProvider>  
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
