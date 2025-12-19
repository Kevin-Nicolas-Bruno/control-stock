const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const UserModel = require('../models/UserModel');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

class AuthController {
  static async register(req, res) {
    try {
      const { username, password } = req.body;
      console.log('Register request body:', req.body);
      if (!username || !password) {
        return res.status(400).json({ success: false, error: 'username y password requeridos' });
      }

      const existing = await UserModel.getUserByUsername(username);
      if (existing) {
        return res.status(409).json({ success: false, error: 'Usuario ya existe' });
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = await UserModel.createUser(username, hashed);

      return res.status(201).json({ success: true, data: { id: user.id, username: user.username } });
    } catch (err) {
      console.error('Error register:', err);
      return res.status(500).json({ success: false, error: 'Error al crear usuario' });
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ success: false, error: 'username y password requeridos' });
      }

      const user = await UserModel.getUserByUsername(username);

      if (!user) {
        return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ success: false, error: 'Credenciales inválidas' });
      }

      if (!JWT_SECRET) {
        console.warn('JWT_SECRET no definido — devolviendo token temporal (no recomendado)');
      }

      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET || 'dev-secret', {
        expiresIn: JWT_EXPIRES_IN
      });

      return res.json({ success: true, data: { token } });
    } catch (err) {
      console.error('Error login:', err);
      return res.status(500).json({ success: false, error: 'Error al hacer login' });
    }
  }
}

module.exports = AuthController;