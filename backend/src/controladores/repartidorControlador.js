import { bd } from '../baseDatos/cliente.js';
import { exito, error } from '../utils/respuesta.js';

export const pedidosDisponibles = async (_req, res, next) => {
  try {
    const r = await bd.query("SELECT * FROM pedidos WHERE estado = 'pendiente' ORDER BY creado_en ASC");
    return exito(res, r.rows, 'Pedidos disponibles');
  } catch (e) { return next(e); }
};

export const aceptarPedido = async (req, res, next) => {
  try {
    const r = await bd.query(
      `UPDATE pedidos SET repartidor_id = $1, estado = 'aceptado', actualizado_en = NOW()
       WHERE id = $2 AND repartidor_id IS NULL RETURNING *`,
      [req.usuario.id, req.params.pedidoId]
    );
    if (!r.rowCount) return error(res, 'Pedido no disponible', 409);
    return exito(res, r.rows[0], 'Pedido aceptado');
  } catch (e) { return next(e); }
};

export const actualizarEstadoPedido = async (req, res, next) => {
  try {
    const { estado } = req.body;
    const permitidos = ['recogido', 'en_camino', 'entregado'];
    if (!permitidos.includes(estado)) return error(res, 'Estado no permitido', 400);
    const r = await bd.query(
      'UPDATE pedidos SET estado = $1, actualizado_en = NOW() WHERE id = $2 AND repartidor_id = $3 RETURNING *',
      [estado, req.params.pedidoId, req.usuario.id]
    );
    if (!r.rowCount) return error(res, 'Pedido no encontrado para este repartidor', 404);
    return exito(res, r.rows[0], 'Estado actualizado');
  } catch (e) { return next(e); }
};
