# InstaShopping MVP

Aplicación de delivery lista para producción (MVP) con arquitectura modular:

- **Frontend**: Next.js (React)
- **Backend**: Node.js + Express
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT

## Estructura del proyecto

```txt
InstaShopping/
├── backend/
│   ├── src/
│   │   ├── baseDatos/
│   │   ├── config/
│   │   ├── controladores/
│   │   ├── middlewares/
│   │   ├── rutas/
│   │   ├── servicios/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.ejemplo
│   ├── package.json
│   └── esquema.sql
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── componentes/
│   │   ├── lib/
│   │   └── tipos/
│   ├── .env.local.ejemplo
│   ├── package.json
│   └── next.config.js
└── README.md
```

## Requisitos

- Node.js 20+
- PostgreSQL 14+

## Configuración backend

1. Ir a `backend/`
2. Copiar variables de entorno:
   ```bash
   cp .env.ejemplo .env
   ```
3. Crear base de datos y ejecutar esquema:
   ```bash
   psql -U postgres -d instashopping -f esquema.sql
   ```
4. Instalar dependencias y ejecutar:
   ```bash
   npm install
   npm run dev
   ```

Backend en: `http://localhost:4000`

## Configuración frontend

1. Ir a `frontend/`
2. Copiar variables de entorno:
   ```bash
   cp .env.local.ejemplo .env.local
   ```
3. Instalar dependencias y ejecutar:
   ```bash
   npm install
   npm run dev
   ```

Frontend en: `http://localhost:3000`

## Endpoints principales

- `POST /api/autenticacion/registro`
- `POST /api/autenticacion/iniciar-sesion`
- `GET /api/tiendas`
- `GET /api/tiendas/:tiendaId/productos`
- `POST /api/pedidos`
- `GET /api/pedidos/mis-pedidos`
- `GET /api/repartidor/pedidos-disponibles`
- `PATCH /api/repartidor/pedidos/:pedidoId/aceptar`
- `PATCH /api/repartidor/pedidos/:pedidoId/estado`
- `GET /api/admin/usuarios`
- `GET /api/admin/pedidos`

## Notas de producción

- Se utiliza `helmet`, `cors`, `morgan` y validaciones con `express-validator`.
- Contraseñas cifradas con `bcryptjs`.
- JWT para autenticación por rol.
- Manejo de errores centralizado y respuestas consistentes.
