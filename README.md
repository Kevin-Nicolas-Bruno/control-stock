# API de Restaurante - Node.js + Express

API REST para gestionar el stock de productos y platos de un restaurante.

## Características

- CRUD completo para productos/platos
- Validación de datos
- Base de datos en memoria
- Respuestas JSON estructuradas

## Instalación

\`\`\`bash
npm install
\`\`\`

## Ejecutar el Servidor

\`\`\`bash
npm run dev
\`\`\`

El servidor se iniciará en `http://localhost:3001`



## Endpoints de la API

### Base URL: `http://localhost:3001`

### 1. Obtener todos los productos
\`\`\`
GET /api/productos
\`\`\`

**Respuesta:**
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "nombre": "Pizza Margherita",
      "precio": 12.99,
      "cantidad": 25
    }
  ],
  "total": 1
}
\`\`\`

### 2. Obtener un producto por ID
\`\`\`
GET /api/productos/:id
\`\`\`

**Respuesta:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "1",
    "nombre": "Pizza Margherita",
    "precio": 12.99,
    "cantidad": 25
  }
}
\`\`\`

### 3. Crear un nuevo producto
\`\`\`
POST /api/productos
Content-Type: application/json
\`\`\`

**Body:**
\`\`\`json
{
  "nombre": "Hamburguesa Clásica",
  "precio": 9.99,
  "cantidad": 20
}
\`\`\`

**Respuesta:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "4",
    "nombre": "Hamburguesa Clásica",
    "precio": 9.99,
    "cantidad": 20
  },
  "message": "Producto creado exitosamente"
}
\`\`\`

### 4. Actualizar un producto
\`\`\`
PUT /api/productos/:id
Content-Type: application/json
\`\`\`

**Body:**
\`\`\`json
{
  "nombre": "Pizza Margherita Grande",
  "precio": 15.99,
  "cantidad": 30
}
\`\`\`

**Respuesta:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "1",
    "nombre": "Pizza Margherita Grande",
    "precio": 15.99,
    "cantidad": 30
  },
  "message": "Producto actualizado exitosamente"
}
\`\`\`

### 5. Eliminar un producto
\`\`\`
DELETE /api/productos/:id
\`\`\`

**Respuesta:**
\`\`\`json
{
  "success": true,
  "data": {
    "id": "1",
    "nombre": "Pizza Margherita",
    "precio": 12.99,
    "cantidad": 25
  },
  "message": "Producto eliminado exitosamente"
}
\`\`\`

## Modelo de Datos

### Producto
\`\`\`typescript
{
  id: string,        // ID único generado automáticamente
  nombre: string,    // Nombre del producto/plato
  precio: number,    // Precio en formato decimal
  cantidad: number   // Cantidad en stock (entero)
}
\`\`\`

## Validaciones

- **nombre**: Requerido, no puede estar vacío
- **precio**: Debe ser un número positivo
- **cantidad**: Debe ser un número entero positivo

## Códigos de Estado HTTP

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `400` - Bad Request: Datos inválidos
- `404` - Not Found: Recurso no encontrado
- `500` - Internal Server Error: Error del servidor

## Ejemplos con cURL

### Obtener todos los productos
\`\`\`bash
curl http://localhost:3001/api/productos
\`\`\`

### Crear un producto
\`\`\`bash
curl -X POST http://localhost:3001/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Tacos al Pastor","precio":7.50,"cantidad":40}'
\`\`\`

### Actualizar un producto
\`\`\`bash
curl -X PUT http://localhost:3001/api/productos/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Pizza Napolitana","precio":13.99,"cantidad":20}'
\`\`\`

### Eliminar un producto
\`\`\`bash
curl -X DELETE http://localhost:3001/api/productos/1
\`\`\`



## Tecnologías

- Node.js
- Express.js
