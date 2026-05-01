import './globals.css';
import Link from 'next/link';

export const metadata = { title: 'InstaShopping', description: 'App delivery en español' };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <main>
          <h1>InstaShopping</h1>
          <nav style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <Link href="/">Inicio</Link><Link href="/tiendas">Tiendas</Link><Link href="/carrito">Carrito</Link>
            <Link href="/pedidos">Mis pedidos</Link><Link href="/repartidor">Panel repartidor</Link><Link href="/admin">Panel admin</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
