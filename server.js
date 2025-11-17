const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos en memoria
let productos = [
  {
    id: '1',
    nombre: 'Pizza Margherita',
    precio: 12.99,
    cantidad: 25
  },
  {
    id: '2',
    nombre: 'Pasta Carbonara',
    precio: 10.50,
    cantidad: 15
  },
  {
    id: '3',
    nombre: 'Ensalada César',
    precio: 8.99,
    cantidad: 30
  }
];

// Función auxiliar para generar IDs
let nextId = 4;
const generarId = () => {
  return String(nextId++);
};

// GET - Obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json({
    success: true,
    data: productos,
    total: productos.length
  });
});

// GET - Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const producto = productos.find(p => p.id === id);
  
  if (!producto) {
    return res.status(404).json({
      success: false,
      error: 'Producto no encontrado'
    });
  }
  
  res.json({
    success: true,
    data: producto
  });
});

// POST - Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio, cantidad } = req.body;
  
  // Validación
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'El nombre es requerido'
    });
  }
  
  if (typeof precio !== 'number' || precio < 0) {
    return res.status(400).json({
      success: false,
      error: 'El precio debe ser un número positivo'
    });
  }
  
  if (!Number.isInteger(cantidad) || cantidad < 0) {
    return res.status(400).json({
      success: false,
      error: 'La cantidad debe ser un número entero positivo'
    });
  }
  
  const nuevoProducto = {
    id: generarId(),
    nombre: nombre.trim(),
    precio: Number(precio),
    cantidad: Number(cantidad)
  };
  
  productos.push(nuevoProducto);
  
  res.status(201).json({
    success: true,
    data: nuevoProducto,
    message: 'Producto creado exitosamente'
  });
});

// PUT - Actualizar un producto
app.put('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio, cantidad } = req.body;
  
  const index = productos.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Producto no encontrado'
    });
  }
  
  // Validación
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'El nombre es requerido'
    });
  }
  
  if (typeof precio !== 'number' || precio < 0) {
    return res.status(400).json({
      success: false,
      error: 'El precio debe ser un número positivo'
    });
  }
  
  if (!Number.isInteger(cantidad) || cantidad < 0) {
    return res.status(400).json({
      success: false,
      error: 'La cantidad debe ser un número entero positivo'
    });
  }
  
  productos[index] = {
    id,
    nombre: nombre.trim(),
    precio: Number(precio),
    cantidad: Number(cantidad)
  };
  
  res.json({
    success: true,
    data: productos[index],
    message: 'Producto actualizado exitosamente'
  });
});

// DELETE - Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const index = productos.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Producto no encontrado'
    });
  }
  
  const productoEliminado = productos[index];
  productos.splice(index, 1);
  
  res.json({
    success: true,
    data: productoEliminado,
    message: 'Producto eliminado exitosamente'
  });
});

// Ruta de inicio
app.get('/', (req, res) => {
  res.json({
    message: 'API de Restaurante - Gestión de Stock',
    version: '1.0.0',
    endpoints: {
      'GET /api/productos': 'Obtener todos los productos',
      'GET /api/productos/:id': 'Obtener un producto por ID',
      'POST /api/productos': 'Crear un nuevo producto',
      'PUT /api/productos/:id': 'Actualizar un producto',
      'DELETE /api/productos/:id': 'Eliminar un producto'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api/productos`);
});
