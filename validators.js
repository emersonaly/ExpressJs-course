import { body, param, validationResult } from 'express-validator';

// Reglas para la creación de un usuario (POST /users)
export const validateCreateUser = [
  body('id').isInt().not().isString().withMessage('Id debe ser un entero no un string'),
  body('name').trim().isLength({ min: 3 }).withMessage('Nombre muy corto'),
  body('email').isEmail().withMessage('Email inválido')
];

// Reglas para la actualización de un usuario (PUT /users/:id)
export const validateUpdateUser = [
  param('id').isInt().withMessage('El ID en la URL debe ser un número entero'),
  body('name').optional().trim().isLength({ min: 3 }).withMessage('Nombre muy corto'),
  body('email').optional().isEmail().withMessage('Email inválido')
];

// Middleware genérico para revisar los errores de validación
export const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Si no hay errores, pasa al siguiente middleware o controlador
  next();
};
