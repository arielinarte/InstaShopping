import jwt from 'jsonwebtoken';
import { entorno } from '../config/entorno.js';
import { error } from '../utils/respuesta.js';

export const autenticar = (req, res, next) => {
  const encabezado = req.headers.authorization;
  if (!encabezado?.startsWith('Bearer ')) return error(res, 'Token requerido', 401);

  const token = encabezado.split(' ')[1];
  try {
    req.usuario = jwt.verify(token, entorno.jwtSecreto);
    return next();
  } catch {
    return error(res, 'Token inválido o vencido', 401);
  }
};

export const autorizarRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.usuario.rol)) return error(res, 'No autorizado', 403);
  return next();
};
