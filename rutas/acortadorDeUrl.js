const express = require('express');

const ruta = express.Router();

const controladorDeRutas = require('../controladores/ruta');

ruta.get('/:urlAcortada', controladorDeRutas.redireccionador);

ruta.post('/acortarUrl', controladorDeRutas.acortarUrl);

module.exports = ruta;
