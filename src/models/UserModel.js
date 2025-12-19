const pool = require('../config/database');

class UserModel {
  static async getUserByUsername(username) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query(
        'SELECT id, username, password FROM users WHERE username = ?',
        [username]
      );
      connection.release();
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async createUser(username, hashedPassword) {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );
      connection.release();
      return { id: result.insertId, username };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;