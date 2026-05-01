import { Router } from 'express';
import { listarTiendas, productosPorTienda } from '../controladores/tiendasControlador.js';

const ruta = Router();
ruta.get('/', listarTiendas);
ruta.get('/:tiendaId/productos', productosPorTienda);

export default ruta;
