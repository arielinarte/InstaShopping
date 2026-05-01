'use client';
import { useState } from 'react';
import { peticionApi } from '../../lib/api';

export default function Registro() {
  const [formulario, setFormulario] = useState({ nombre: '', correo: '', password: '', rol: 'cliente' });
  const [mensaje, setMensaje] = useState('');
  const enviar = async (e) => {
    e.preventDefault();
    const r = await peticionApi('/autenticacion/registro', { method: 'POST', body: JSON.stringify(formulario) });
    setMensaje(r.mensaje);
  };
  return <form className="card" onSubmit={enviar}><h2>Registro</h2>
    <input placeholder="Nombre" onChange={(e)=>setFormulario({...formulario,nombre:e.target.value})}/>
    <input placeholder="Correo" onChange={(e)=>setFormulario({...formulario,correo:e.target.value})}/>
    <input type="password" placeholder="Contraseña" onChange={(e)=>setFormulario({...formulario,password:e.target.value})}/>
    <select onChange={(e)=>setFormulario({...formulario,rol:e.target.value})}><option value="cliente">Cliente</option><option value="repartidor">Repartidor</option></select>
    <button type="submit">Registrarme</button><p>{mensaje}</p></form>;
}
