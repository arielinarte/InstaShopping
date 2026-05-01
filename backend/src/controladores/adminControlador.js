import { bd } from '../baseDatos/cliente.js';
import { exito } from '../utils/respuesta.js';

export const listarUsuarios = async (_req, res, next) => {
  try {
    const r = await bd.query('SELECT id, nombre, correo, rol, creado_en FROM usuarios ORDER BY creado_en DESC');
    return exito(res, r.rows, 'Usuarios listados');
  } catch (e) { return next(e); }
};

export const dashboardPedidos = async (_req, res, next) => {
  try {
    const resumen = await bd.query('SELECT estado, COUNT(*)::int AS total FROM pedidos GROUP BY estado');
    const pedidos = await bd.query('SELECT * FROM pedidos ORDER BY creado_en DESC LIMIT 50');
    return exito(res, { resumen: resumen.rows, pedidos: pedidos.rows }, 'Dashboard de pedidos');
  } catch (e) { return next(e); }
};
