import { bd } from '../baseDatos/cliente.js';
import { exito, error } from '../utils/respuesta.js';

export const crearPedido = async (req, res, next) => {
  const clienteId = req.usuario.id;
  const { tiendaId, direccionEntrega, items } = req.body;
  const cliente = await bd.connect();
  try {
    await cliente.query('BEGIN');
    const pedido = await cliente.query(
      `INSERT INTO pedidos (cliente_id, tienda_id, direccion_entrega, estado)
       VALUES ($1, $2, $3, 'pendiente') RETURNING *`,
      [clienteId, tiendaId, direccionEntrega]
    );

    for (const item of items) {
      await cliente.query(
        `INSERT INTO pedido_items (pedido_id, producto_id, cantidad, precio_unitario)
         VALUES ($1, $2, $3, $4)`,
        [pedido.rows[0].id, item.productoId, item.cantidad, item.precioUnitario]
      );
    }

    await cliente.query('COMMIT');
    return exito(res, pedido.rows[0], 'Pedido creado', 201);
  } catch (e) {
    await cliente.query('ROLLBACK');
    return next(e);
  } finally { cliente.release(); }
};

export const misPedidos = async (req, res, next) => {
  try {
    const r = await bd.query('SELECT * FROM pedidos WHERE cliente_id = $1 ORDER BY creado_en DESC', [req.usuario.id]);
    return exito(res, r.rows, 'Pedidos del cliente');
  } catch (e) { return next(e); }
};

export const seguimientoPedido = async (req, res, next) => {
  try {
    const r = await bd.query('SELECT id, estado, actualizado_en FROM pedidos WHERE id = $1', [req.params.pedidoId]);
    if (!r.rowCount) return error(res, 'Pedido no encontrado', 404);
    return exito(res, r.rows[0], 'Estado actual del pedido');
  } catch (e) { return next(e); }
};
