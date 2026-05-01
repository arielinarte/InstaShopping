import { Router } from 'express';
import { autenticar, autorizarRoles } from '../middlewares/autenticacion.js';
import { crearPedido, misPedidos, seguimientoPedido } from '../controladores/pedidosControlador.js';

const ruta = Router();
ruta.use(autenticar, autorizarRoles('cliente'));
ruta.post('/', crearPedido);
ruta.get('/mis-pedidos', misPedidos);
ruta.get('/:pedidoId/seguimiento', seguimientoPedido);

export default ruta;
