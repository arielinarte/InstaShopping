import { validationResult } from 'express-validator';
import { error } from '../utils/respuesta.js';

export const validar = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return error(res, 'Datos inválidos', 400, errores.array());
  }
  return next();
};
