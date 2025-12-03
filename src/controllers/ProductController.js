const ProductModel = require("../models/ProductModel");
const {
  validateProductData,
  validateProductId,
} = require("../utils/validators");
const { successResponse, errorResponse } = require("../utils/responses");
//advertencia de stock bajo - tambien se podria hacer una tabla de configuracion en la DB para setearlo dinamicamente
const warning = require("../config/stockWarning");

class ProductController {
  /**
   * GET /api/productos - Obtener todos los productos
   */
  static async getAllProductos(req, res) {
    try {
      const productos = await ProductModel.getAllProductos();
      const bajoStock = productos.filter((p) => p.cantidad < warning);
      const mensaje =
        "stock bajo de: " +
        bajoStock.map((p) => `${p.nombre} (${p.cantidad})`).join(", ");

      successResponse(res, productos, mensaje, 200);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      errorResponse(res, error, 500, "Error al obtener los productos");
    }
  }
    /**
     * GET /api/productos/bajo-stock - Obtener productos con stock bajo
     */
  static async getProductosBajoStock(req, res) {
    try {
      const productos = await ProductModel.getAllProductos();
      const bajoStock = productos.filter((p) => p.cantidad < warning);
      successResponse(res, bajoStock, "Productos con stock bajo", 200);
    } catch (error) {
      console.error("Error al obtener productos con stock bajo:", error);
      errorResponse(
        res,
        error,
        500,
        "Error al obtener los productos con stock bajo"
      );
    }
  }

  /**
   * GET /api/productos/:id - Obtener un producto por ID
   */
  static async getProductoById(req, res) {
    try {
      const { id } = req.params;

      const validation = validateProductId(id);
      if (!validation.isValid) {
        return errorResponse(
          res,
          new Error(validation.error),
          400,
          validation.error
        );
      }

      const producto = await ProductModel.getProductoById(id);

      if (!producto) {
        return errorResponse(
          res,
          new Error("Producto no encontrado"),
          404,
          "Producto no encontrado"
        );
      }
      let mensaje = "";
      console.log("stock actual: " + producto.cantidad, "minimo " + warning);
      if (producto.cantidad < warning) {
        mensaje = "stock bajo";
      }

      successResponse(res, producto, mensaje);
    } catch (error) {
      console.error("Error al obtener producto:", error);
      errorResponse(res, error, 500, "Error al obtener el producto");
    }
  }

  /**
   * POST /api/productos - Crear un nuevo producto
   */
  static async createProducto(req, res) {
    try {
      const { nombre, precio, cantidad } = req.body;

      const validation = validateProductData(nombre, precio, cantidad);
      if (!validation.isValid) {
        return errorResponse(
          res,
          new Error(validation.errors.join(", ")),
          400,
          validation.errors.join(", ")
        );
      }

      const nuevoProducto = await ProductModel.createProducto(
        nombre.trim(),
        parseFloat(precio),
        parseInt(cantidad)
      );

      successResponse(res, nuevoProducto, "Producto creado exitosamente", 201);
    } catch (error) {
      console.error("Error al crear producto:", error);
      errorResponse(res, error, 500, "Error al crear el producto");
    }
  }

  /**
   * PUT /api/productos/:id - Actualizar un producto
   */
  static async updateProducto(req, res) {
    try {
      const { id } = req.params;
      const { nombre, precio, cantidad } = req.body;

      const validation = validateProductId(id);
      if (!validation.isValid) {
        return errorResponse(
          res,
          new Error(validation.error),
          400,
          validation.error
        );
      }

      const validationData = validateProductData(nombre, precio, cantidad);
      if (!validationData.isValid) {
        return errorResponse(
          res,
          new Error(validationData.errors.join(", ")),
          400,
          validationData.errors.join(", ")
        );
      }

      const productoActualizado = await ProductModel.updateProducto(
        id,
        nombre.trim(),
        parseFloat(precio),
        parseInt(cantidad)
      );

      if (!productoActualizado) {
        return errorResponse(
          res,
          new Error("Producto no encontrado"),
          404,
          "Producto no encontrado"
        );
      }

      successResponse(
        res,
        productoActualizado,
        "Producto actualizado exitosamente"
      );
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      errorResponse(res, error, 500, "Error al actualizar el producto");
    }
  }

  /**
   * DELETE /api/productos/:id - Eliminar un producto
   */
  static async deleteProducto(req, res) {
    try {
      const { id } = req.params;

      const validation = validateProductId(id);
      if (!validation.isValid) {
        return errorResponse(
          res,
          new Error(validation.error),
          400,
          validation.error
        );
      }

      const eliminado = await ProductModel.deleteProducto(id);

      if (!eliminado) {
        return errorResponse(
          res,
          new Error("Producto no encontrado"),
          404,
          "Producto no encontrado"
        );
      }

      successResponse(res, { id }, "Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      errorResponse(res, error, 500, "Error al eliminar el producto");
    }
  }
}

module.exports = ProductController;
