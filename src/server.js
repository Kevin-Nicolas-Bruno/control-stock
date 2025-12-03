const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Rutas
 */

// Ruta de inicio
app.get('/', (req, res) => {
  res.json({
    message: 'API de Restaurante - Gestión de Stock',
    version: '2.0.0',
    description: 'API RESTful para gestionar productos de restaurante con MySQL',
    endpoints: {
      'GET /api/productos': 'Obtener todos los productos',
      'GET /api/productos/:id': 'Obtener un producto por ID',
      'POST /api/productos': 'Crear un nuevo producto',
      'PUT /api/productos/:id': 'Actualizar un producto',
      'DELETE /api/productos/:id': 'Eliminar un producto'
    }
  });
});

// Rutas de API
app.use('/api/productos', productRoutes);

/**
 * Manejo de rutas no encontradas
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method
  });
});

/**
 * Manejo de errores global
 */
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor',
    status: err.status || 500
  });
});

/**
 * Iniciar servidor
 */
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api/productos`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
