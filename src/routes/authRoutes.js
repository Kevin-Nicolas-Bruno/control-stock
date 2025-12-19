const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Registrar usuario (opcional)
router.post('/register', AuthController.register);

// Login
router.post('/login', AuthController.login);

module.exports = router;
