import { Router } from 'express';
import { body } from 'express-validator';
import { iniciarSesion, registro } from '../controladores/autenticacionControlador.js';
import { validar } from '../middlewares/validacion.js';

const ruta = Router();

ruta.post('/registro', [body('nombre').notEmpty(), body('correo').isEmail(), body('password').isLength({ min: 6 }), validar], registro);
ruta.post('/iniciar-sesion', [body('correo').isEmail(), body('password').notEmpty(), validar], iniciarSesion);

export default ruta;
