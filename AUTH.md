# 🔒 Autenticación con JWT

Se añadió un sistema simple de autenticación mediante JWT.

Endpoints:

- POST /api/auth/register
  Body JSON: { "username": "admin", "password": "mi_password" }
  Crea un usuario con contraseña hasheada (bcrypt).

- POST /api/auth/login
  Body JSON: { "username": "admin", "password": "mi_password" }
  Respuesta: { "success": true, "data": { "token": "<JWT>" } }

Uso del token:

- Todas las rutas de productos (`/api/productos`) están protegidas.
- Enviar header: `Authorization: Bearer <JWT>`

Variables de entorno necesarias (en `.env` o `.env.example`):

```
JWT_SECRET=tu_secreto_aqui
JWT_EXPIRES_IN=1h
```

Cómo crear un usuario (ejemplo cURL):

```bash
curl -X POST http://localhost:3001/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","password":"mi_password"}'

# Luego hacer login
curl -X POST http://localhost:3001/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","password":"mi_password"}'
```
