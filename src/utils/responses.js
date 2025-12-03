/**
 * Respuesta exitosa
 */
const successResponse = (res, data, message="", statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
    message
  });
};

/**
 * Respuesta de error
 */
const errorResponse = (res, error, statusCode = 500, message = null) => {
  res.status(statusCode).json({
    success: false,
    error: message || error.message || 'Error interno del servidor',
    status: statusCode
  });
};

module.exports = {
  successResponse,
  errorResponse
};
