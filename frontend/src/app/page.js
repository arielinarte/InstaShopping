import Link from 'next/link';

export default function Inicio() {
  return <div className="card"><h2>Bienvenido</h2><p>Compra y recibe en minutos.</p><Link href="/registro">Crear cuenta</Link></div>;
}
