import { Router } from 'express';
import { autenticar, autorizarRoles } from '../middlewares/autenticacion.js';
import { aceptarPedido, actualizarEstadoPedido, pedidosDisponibles } from '../controladores/repartidorControlador.js';

const ruta = Router();
ruta.use(autenticar, autorizarRoles('repartidor'));
ruta.get('/pedidos-disponibles', pedidosDisponibles);
ruta.patch('/pedidos/:pedidoId/aceptar', aceptarPedido);
ruta.patch('/pedidos/:pedidoId/estado', actualizarEstadoPedido);

export default ruta;
