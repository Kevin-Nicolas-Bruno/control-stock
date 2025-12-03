const pool = require('../config/database');

    //acceso a la base de datos - operaciones CRUD
class ProductModel {
  /**
   * Obtener todos los productos
   */
  static async getAllProductos() {
    try {
      const connection = await pool.getConnection();
      const [productos] = await connection.query(
        'SELECT id, nombre, precio, cantidad FROM productos ORDER BY id'
      );
      connection.release();
      return productos;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtener un producto por ID
   */
  static async getProductoById(id) {
    try {
      const connection = await pool.getConnection();
      const [productos] = await connection.query(
        'SELECT id, nombre, precio, cantidad FROM productos WHERE id = ?',
        [id]
      );
      connection.release();
      return productos[0] || null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Crear un nuevo producto
   */
  static async createProducto(nombre, precio, cantidad) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO productos (nombre, precio, cantidad) VALUES (?, ?, ?)',
        [nombre, precio, cantidad]
      );
      connection.release();
      
      return {
        id: result.insertId,
        nombre,
        precio,
        cantidad
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualizar un producto
   */
  static async updateProducto(id, nombre, precio, cantidad) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'UPDATE productos SET nombre = ?, precio = ?, cantidad = ? WHERE id = ?',
        [nombre, precio, cantidad, id]
      );
      connection.release();

      if (result.affectedRows === 0) {
        return null;
      }

      return {
        id,
        nombre,
        precio,
        cantidad
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Eliminar un producto
   */
  static async deleteProducto(id) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'DELETE FROM productos WHERE id = ?',
        [id]
      );
      connection.release();
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductModel;
