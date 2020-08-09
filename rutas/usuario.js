const express = require('express');
const { body } = require('express-validator');

const ruta = express.Router();

const controladorDeUsuario = require('../controladores/usuario');
const { estaLogueado } = require('../middlewares/estaLogueado');
const baseDeDatos = require('../utilidades/baseDeDatos');

const correoEsUnico = async (correo) => {
  if (await baseDeDatos.correoExisteEnLaDB(correo)) {
    throw new Error('Ya existe un usuario registrado con este correo');
  }
  return true;
};

const existeUnCorreoRegistrado = async (correo) => {
  if (await baseDeDatos.correoExisteEnLaDB(correo)) {
    return true;
  }
  throw new Error('Correo incorrecto');
};

const aliasEsUnico = async (alias) => {
  if (await baseDeDatos.aliasExisteEnLaDB(alias)) {
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

ruta.post('/login', body('correo').custom(existeUnCorreoRegistrado),
  controladorDeUsuario.loginDeUsuario);

ruta.get('/perfil', estaLogueado, controladorDeUsuario.perfil);
