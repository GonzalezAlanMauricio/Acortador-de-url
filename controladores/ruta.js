const { validationResult } = require('express-validator');
const baseDeDatos = require('../utilidades/baseDeDatos');

module.exports.acortarUrl = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { urlOriginal, urlAcortada } = req.body;
  baseDeDatos.guardarNuevaUrl(urlOriginal, urlAcortada);
  return res.status(200).send({ mensaje: 'url creada', urlOriginal, urlAcortada });
};

module.exports.redireccionador = async (req, res) => {
  console.log(`Entro`);
  const { urlAcortada } = req.params;
  const urlEncontrada = await baseDeDatos.buscarUnaUrl(urlAcortada);
  if (urlEncontrada) {
    console.log('Url: ', urlEncontrada.creado_el);
    baseDeDatos.registrarVisita(urlAcortada);
    res.redirect(301, urlEncontrada.urlOriginal);
  } else {
    res.status(404).send({ mensaje: 'No existe url registrada' });
  }
};
