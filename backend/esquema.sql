CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  correo VARCHAR(160) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  rol VARCHAR(20) NOT NULL CHECK (rol IN ('cliente', 'repartidor', 'administrador')),
  creado_en TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tiendas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT,
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  creado_en TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  tienda_id INT NOT NULL REFERENCES tiendas(id) ON DELETE CASCADE,
  nombre VARCHAR(160) NOT NULL,
  precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
  stock INT NOT NULL DEFAULT 0,
  creado_en TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pedidos (
  id SERIAL PRIMARY KEY,
  cliente_id INT NOT NULL REFERENCES usuarios(id),
  repartidor_id INT REFERENCES usuarios(id),
  tienda_id INT NOT NULL REFERENCES tiendas(id),
  direccion_entrega TEXT NOT NULL,
  estado VARCHAR(30) NOT NULL DEFAULT 'pendiente',
  creado_en TIMESTAMP NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pedido_items (
  id SERIAL PRIMARY KEY,
  pedido_id INT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id INT NOT NULL REFERENCES productos(id),
  cantidad INT NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC(10,2) NOT NULL CHECK (precio_unitario >= 0)
);

CREATE TABLE IF NOT EXISTS entregas (
  id SERIAL PRIMARY KEY,
  pedido_id INT NOT NULL UNIQUE REFERENCES pedidos(id) ON DELETE CASCADE,
  repartidor_id INT NOT NULL REFERENCES usuarios(id),
  estado VARCHAR(30) NOT NULL,
  ubicacion_actual VARCHAR(255),
  actualizado_en TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO tiendas (nombre, descripcion)
VALUES
  ('Mercado Central', 'Abarrotes y productos frescos'),
  ('Farmacia Salud', 'Medicamentos y productos de cuidado personal')
ON CONFLICT DO NOTHING;
