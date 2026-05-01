'use client';
import { useState } from 'react';
import { peticionApi } from '../../lib/api';

export default function Pedidos() {
  const [resultado, setResultado] = useState('');
  const crearPedidoDemo = async () => {
    const r = await peticionApi('/pedidos', { method: 'POST', body: JSON.stringify({ tiendaId: 1, direccionEntrega: 'Calle Principal 123', items: [{ productoId: 1, cantidad: 1, precioUnitario: 10 }] }) });
    setResultado(r.mensaje);
  };
  return <div className="card"><h2>Pedidos</h2><button onClick={crearPedidoDemo}>Crear pedido de prueba</button><p>{resultado}</p></div>;
}
