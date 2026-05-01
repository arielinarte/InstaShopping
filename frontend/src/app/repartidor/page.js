'use client';
import { useState } from 'react';
import { peticionApi } from '../../lib/api';

export default function Repartidor() {
  const [pedidos, setPedidos] = useState([]);
  const cargar = async () => { const r = await peticionApi('/repartidor/pedidos-disponibles'); setPedidos(r.datos || []); };
  return <div className="card"><h2>Panel repartidor</h2><button onClick={cargar}>Ver pedidos disponibles</button>{pedidos.map(p=><div key={p.id}>Pedido #{p.id} - {p.estado}</div>)}</div>;
}
