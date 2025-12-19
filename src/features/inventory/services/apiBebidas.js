const BASE_URL = 'http://localhost:3001/api'; // Cambiar según sea necesario

/**
 * Maneja respuestas fetch y lanza error con mensaje adecuado
 * @param {Response} res
 */
async function handleResponse(res) {
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const body = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    const message = (body && body.message) || body || `HTTP ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }

  return body;
}

/**
 * Obtener todos los productos (bebidas)
 * @param {string} [token] - token JWT opcional para endpoints protegidos
 */
export async function getProductos(token) {
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

  const res = await fetch(`${BASE_URL}/productos`, { headers });
  return handleResponse(res);
}

/**
 * Login: recibe { email, password }
 * Devuelve el body de la respuesta (p.ej. token, user)
 */
export async function login(credentials) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  return handleResponse(res);
}

/**
 * Register: recibe datos de usuario (p.ej. { name, email, password })
 */
export async function register(userData) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  return handleResponse(res);
}

// Export por defecto por compatibilidad si se prefiere importar como objeto
export default {
  getProductos,
  login,
  register,
};
