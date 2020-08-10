const express = require('express');
const { body } = require('express-validator');

const ruta = express.Router();

const { estaLogueado } = require('../middlewares/estaLogueado');

const controladorDeRutas = require('../controladores/ruta');
const baseDeDatos = require('../utilidades/baseDeDatos');

const esRepetida = async (urlAcortada) => {
  if (await baseDeDatos.urlAcortadaExiste(urlAcortada)) {
    throw new Error('Ya existe una url corta igual');
  }
  return true;
};

ruta.get('/:urlAcortada', controladorDeRutas.redireccionador);

ruta.post('/acortarUrl', estaLogueado,
  body('urlOriginal').isURL({
    protocols: ['http', 'https'],
    require_tld: true,
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_underscores: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    disallow_auth: false,
  })
    .withMessage(
      'La url tiene que tener un protocolo (http o https). Ejemplo de una url valida: '
      + 'https://s-media-cache-ak0.pinimg.com/originals/90/56/aa/9056aa5af4a553065772183eda26b33e.jpg',
    ), body('urlAcortada').isAlphanumeric()
      .withMessage('La url solo puede contener caracteres alfanuméricos'),
  body('urlAcortada').custom(esRepetida),
  controladorDeRutas.acortarUrl);

module.exports = ruta;
