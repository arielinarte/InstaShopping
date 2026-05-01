const urlBase = process.env.NEXT_PUBLIC_API_URL;

export async function peticionApi(ruta, opciones = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = { 'Content-Type': 'application/json', ...(opciones.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${urlBase}${ruta}`, { ...opciones, headers });
  return res.json();
}
