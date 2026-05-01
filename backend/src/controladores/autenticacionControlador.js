import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { bd } from '../baseDatos/cliente.js';
import { entorno } from '../config/entorno.js';
import { exito, error } from '../utils/respuesta.js';

export const registro = async (req, res, next) => {
  try {
    const { nombre, correo, password, rol = 'cliente' } = req.body;
    const existente = await bd.query('SELECT id FROM usuarios WHERE correo = $1', [correo]);
    if (existente.rowCount) return error(res, 'El correo ya está registrado', 409);

    const hash = await bcrypt.hash(password, 10);
    const resultado = await bd.query(
      `INSERT INTO usuarios (nombre, correo, password_hash, rol)
       VALUES ($1, $2, $3, $4) RETURNING id, nombre, correo, rol`,
      [nombre, correo, hash, rol]
    );

    return exito(res, resultado.rows[0], 'Usuario registrado', 201);
  } catch (err) {
    return next(err);
  }
};

export const iniciarSesion = async (req, res, next) => {
  try {
    const { correo, password } = req.body;
    const resultado = await bd.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (!resultado.rowCount) return error(res, 'Credenciales inválidas', 401);

    const usuario = resultado.rows[0];
    const coincide = await bcrypt.compare(password, usuario.password_hash);
    if (!coincide) return error(res, 'Credenciales inválidas', 401);

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol, nombre: usuario.nombre }, entorno.jwtSecreto, {
      expiresIn: entorno.jwtExpiracion
    });

    return exito(res, { token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } }, 'Sesión iniciada');
  } catch (err) {
    return next(err);
  }
};
