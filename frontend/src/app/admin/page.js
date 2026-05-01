'use client';
import { useState } from 'react';
import { peticionApi } from '../../lib/api';

export default function Admin() {
  const [texto, setTexto] = useState('');
  const cargarUsuarios = async () => { const r = await peticionApi('/admin/usuarios'); setTexto(`Usuarios: ${(r.datos || []).length}`); };
  const cargarPedidos = async () => { const r = await peticionApi('/admin/pedidos'); setTexto(`Pedidos dashboard: ${(r.datos?.pedidos || []).length}`); };
  return <div className="card"><h2>Panel administrador</h2><button onClick={cargarUsuarios}>Gestionar usuarios</button> <button onClick={cargarPedidos}>Ver dashboard de pedidos</button><p>{texto}</p></div>;
}
