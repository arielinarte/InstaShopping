import { Router } from 'express';
import { autenticar, autorizarRoles } from '../middlewares/autenticacion.js';
import { dashboardPedidos, listarUsuarios } from '../controladores/adminControlador.js';

const ruta = Router();
ruta.use(autenticar, autorizarRoles('administrador'));
ruta.get('/usuarios', listarUsuarios);
ruta.get('/pedidos', dashboardPedidos);

export default ruta;
