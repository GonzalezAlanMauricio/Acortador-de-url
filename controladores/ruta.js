const { validationResult } = require('express-validator');
const baseDeDatos = require('../utilidades/baseDeDatos');

module.exports.acortarUrl = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { urlOriginal, urlAcortada } = req.body;
  const { correoDeUsuario } = req;
  try {
    baseDeDatos.guardarNuevaUrl(urlOriginal, urlAcortada, correoDeUsuario);
    return res.status(200).send({ mensaje: 'url creada', urlOriginal, urlAcortada });
  } catch (error) {
    res.status(500).send({ mensaje: 'El servidor tiene un error, lo suolucionaremos en un momento' });
  }
};

module.exports.redireccionador = async (req, res) => {
  const { urlAcortada } = req.params;
  const urlEncontrada = await baseDeDatos.buscarUnaUrl(urlAcortada);
  if (urlEncontrada) {
    baseDeDatos.registrarVisita(urlAcortada);
    res.redirect(301, urlEncontrada.urlOriginal);
  } else {
    res.status(404).send({ mensaje: 'No existe url registrada' });
  }
};
