const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

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
