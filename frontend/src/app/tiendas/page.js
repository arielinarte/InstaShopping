'use client';
import { useEffect, useState } from 'react';
import { peticionApi } from '../../lib/api';

export default function Tiendas() {
  const [tiendas, setTiendas] = useState([]);
  const [productos, setProductos] = useState([]);
  useEffect(() => { peticionApi('/tiendas').then(r => setTiendas(r.datos || [])); }, []);
  const verProductos = async (id) => {
    const r = await peticionApi(`/tiendas/${id}/productos`);
    setProductos(r.datos || []);
  };
  return <div><div className="card"><h2>Tiendas</h2>{tiendas.map(t=><div key={t.id}><b>{t.nombre}</b> <button onClick={()=>verProductos(t.id)}>Ver productos</button></div>)}</div>
  <div className="card"><h3>Productos</h3>{productos.map(p=><div key={p.id}>{p.nombre} - ${p.precio}</div>)}</div></div>;
}
