import dotenv from 'dotenv';

dotenv.config();

export const entorno = {
  puerto: Number(process.env.PUERTO || 4000),
  urlFrontend: process.env.URL_FRONTEND || 'http://localhost:3000',
  jwtSecreto: process.env.JWT_SECRETO || 'secreto_desarrollo',
  jwtExpiracion: process.env.JWT_EXPIRACION || '1d',
  bd: {
    host: process.env.BD_HOST,
    puerto: Number(process.env.BD_PUERTO || 5432),
    usuario: process.env.BD_USUARIO,
    password: process.env.BD_PASSWORD,
    nombre: process.env.BD_NOMBRE
  }
};
