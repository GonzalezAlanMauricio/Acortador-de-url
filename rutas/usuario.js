const express = require('express');
const { body } = require('express-validator');

const ruta = express.Router();

const controladorDeUsuario = require('../controladores/usuario');
const baseDeDatos = require('../utilidades/baseDeDatos');

const correoEsUnico = async (correo) => {
  if (await baseDeDatos.correoUsado(correo)) {
    throw new Error('Ya existe un usuario registrado con este correo');
  }
  return true;
};

const aliasEsUnico = async (alias) => {
  if (await baseDeDatos.aliasUsado(alias)) {
    throw new Error('Ya existe un usuario registrado con este alias');
  }
  return true;
};

ruta.post('/registrar',
  body('correo').isEmail().withMessage('Es necesario un correo valido'),
  body('correo').custom(correoEsUnico),
  body('contra').isLength({ min: 4 })
    .withMessage('Es necesario una contraseña de almenos 4 caracteres'),
  body('nombre').isAlpha().withMessage('Solo se permiten caracteres alfabeticos'),
  body('apellido').isAlpha().withMessage('Solo se permiten caracteres alfabeticos'),
  body('alias').isAlphanumeric().withMessage('Solo se permiten caracteres alfanumericos')
    .isLength({ min: 4 })
    .withMessage('Es necesario una longitud minima de 4 caracteres'),
  body('alias').custom(aliasEsUnico),
  controladorDeUsuario.registrarUsuario);
module.exports = ruta;
