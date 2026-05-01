import pkg from 'pg';
import { entorno } from '../config/entorno.js';

const { Pool } = pkg;

export const bd = new Pool({
  host: entorno.bd.host,
  port: entorno.bd.puerto,
  user: entorno.bd.usuario,
  password: entorno.bd.password,
  database: entorno.bd.nombre
});
