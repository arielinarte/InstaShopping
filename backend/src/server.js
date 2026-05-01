import app from './app.js';
import { entorno } from './config/entorno.js';

app.listen(entorno.puerto, () => {
  console.log(`Servidor API en puerto ${entorno.puerto}`);
});
