import { error } from '../utils/respuesta.js';

export const noEncontrado = (_req, res) => error(res, 'Ruta no encontrada', 404);

export const manejoErrores = (err, _req, res, _next) => {
  console.error(err);
  return error(res, err.message || 'Error inesperado', err.codigo || 500);
};
