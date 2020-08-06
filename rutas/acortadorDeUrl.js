const express = require('express');
const { body } = require('express-validator');

const ruta = express.Router();

const controladorDeRutas = require('../controladores/ruta');
const baseDeDatos = require('../utilidades/baseDeDatos');

const esRepetida = (urlAcortada) => {
  if (baseDeDatos.urlAcortadaExiste(urlAcortada)) {
    throw new Error('Ya existe una url corta igual');
  }
};

ruta.get('/:urlAcortada', controladorDeRutas.redireccionador);

ruta.post('/acortarUrl',
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
      .withMessage('La url solo puede contener caracteres alfanumericos'),
  body('urlAcortada').custom(esRepetida),
  controladorDeRutas.acortarUrl);

module.exports = ruta;
