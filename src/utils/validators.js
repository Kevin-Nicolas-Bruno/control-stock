/**
 * Validadores para productos
 */

const validateProductData = (nombre, precio, cantidad) => {
  const errors = [];

  if (!nombre || nombre.trim() === '') {
    errors.push('El nombre es requerido');
  }

  if (typeof precio !== 'number' || precio < 0) {
    errors.push('El precio debe ser un número positivo');
  }

  if (!Number.isInteger(cantidad) || cantidad < 0) {
    errors.push('La cantidad debe ser un número entero positivo');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateProductId = (id) => {
  if (!id || isNaN(id)) {
    return {
      isValid: false,
      error: 'ID de producto inválido'
    };
  }
  return { isValid: true };
};

module.exports = {
  validateProductData,
  validateProductId
};
