// app/layout.js

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col items-center justify-center bg-red-900">
        {children}
      </body>
    </html>
  );
}