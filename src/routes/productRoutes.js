const express = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protección: todas las rutas requieren token válido
router.use(authMiddleware);

/**
 * Rutas de Productos
 */

// GET - Obtener todos los productos
router.get('/', ProductController.getAllProductos);
//GET - Obtener productos con stock bajo
router.get('/bajo-stock', ProductController.getProductosBajoStock);

// GET - Obtener un producto por ID
router.get('/:id', ProductController.getProductoById);

// POST - Crear un nuevo producto
router.post('/', ProductController.createProducto);

// PUT - Actualizar un producto
router.put('/:id', ProductController.updateProducto);

// DELETE - Eliminar un producto
router.delete('/:id', ProductController.deleteProducto);

module.exports = router;
