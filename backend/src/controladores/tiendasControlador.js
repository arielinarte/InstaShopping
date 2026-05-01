import { bd } from '../baseDatos/cliente.js';
import { exito } from '../utils/respuesta.js';

export const listarTiendas = async (_req, res, next) => {
  try {
    const r = await bd.query('SELECT id, nombre, descripcion FROM tiendas ORDER BY nombre');
    return exito(res, r.rows, 'Tiendas obtenidas');
  } catch (e) { return next(e); }
};

export const productosPorTienda = async (req, res, next) => {
  try {
    const { tiendaId } = req.params;
    const r = await bd.query(
      'SELECT id, nombre, precio, stock, tienda_id FROM productos WHERE tienda_id = $1 ORDER BY nombre',
      [tiendaId]
    );
    return exito(res, r.rows, 'Productos obtenidos');
  } catch (e) { return next(e); }
};
