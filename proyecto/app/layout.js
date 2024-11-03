// /app/layout.js

import './globals.css';
import Header from './Header/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
