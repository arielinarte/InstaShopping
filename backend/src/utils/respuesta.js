export const exito = (res, datos, mensaje = 'Operación exitosa', codigo = 200) =>
  res.status(codigo).json({ ok: true, mensaje, datos });

export const error = (res, mensaje = 'Error interno', codigo = 500, detalles = null) =>
  res.status(codigo).json({ ok: false, mensaje, detalles });
