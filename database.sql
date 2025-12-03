-- Crear base de datos
CREATE DATABASE IF NOT EXISTS gestion_restaurante;
USE gestion_restaurante;

-- Tabla de productos
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL UNIQUE,
  precio DECIMAL(10, 2) NOT NULL CHECK (precio > 0),
  cantidad INT NOT NULL DEFAULT 0 CHECK (cantidad >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos de ejemplo
INSERT INTO productos (nombre, precio, cantidad) VALUES
('agua mineral', 12.99, 25),
('coca cola', 10.50, 15),
('pepsi', 8.99, 30)
ON DUPLICATE KEY UPDATE cantidad = VALUES(cantidad);
