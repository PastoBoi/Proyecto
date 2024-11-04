// /app/layout.js

import './globals.css';
import { LanguageProvider } from './Componentes/languageContext';
import { AuthProvider } from './Context/AuthContext';
import Header from './Header/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <LanguageProvider>
            <Header />
            <main>{children}</main>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
