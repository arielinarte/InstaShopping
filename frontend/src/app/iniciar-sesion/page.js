'use client';
import { useState } from 'react';
import { peticionApi } from '../../lib/api';

export default function IniciarSesion() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const enviar = async (e) => {
    e.preventDefault();
    const r = await peticionApi('/autenticacion/iniciar-sesion', { method: 'POST', body: JSON.stringify({ correo, password }) });
    if (r?.datos?.token) localStorage.setItem('token', r.datos.token);
    setMensaje(r.mensaje);
  };
  return <form className="card" onSubmit={enviar}><h2>Iniciar sesión</h2><input placeholder="Correo" onChange={(e)=>setCorreo(e.target.value)}/><input type="password" placeholder="Contraseña" onChange={(e)=>setPassword(e.target.value)}/><button>Entrar</button><p>{mensaje}</p></form>;
}
