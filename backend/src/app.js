import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { entorno } from './config/entorno.js';
import autenticacionRutas from './rutas/autenticacionRutas.js';
import tiendasRutas from './rutas/tiendasRutas.js';
import pedidosRutas from './rutas/pedidosRutas.js';
import repartidorRutas from './rutas/repartidorRutas.js';
import adminRutas from './rutas/adminRutas.js';
import { manejoErrores, noEncontrado } from './middlewares/manejoErrores.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: entorno.urlFrontend }));
app.use(morgan('dev'));
app.use(express.json());

app.get('/salud', (_req, res) => res.json({ ok: true, mensaje: 'API operativa' }));
app.use('/api/autenticacion', autenticacionRutas);
app.use('/api/tiendas', tiendasRutas);
app.use('/api/pedidos', pedidosRutas);
app.use('/api/repartidor', repartidorRutas);
app.use('/api/admin', adminRutas);

app.use(noEncontrado);
app.use(manejoErrores);

export default app;
