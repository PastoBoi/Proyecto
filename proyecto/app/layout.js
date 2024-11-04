// /app/layout.js

import './globals.css';
import { LanguageProvider } from '../Componentes/LanguageContext';
import Header from './Header/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
