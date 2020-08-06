const baseDeDatos = require('../utilidades/baseDeDatos');

module.exports.acortarUrl = async (req, res) => {
  const { urlOriginal, urlAcortada } = req.body;
  baseDeDatos.guardarNuevaUrl(urlOriginal, urlAcortada);
  res.status(200).send({ mensaje: 'url creada', urlOriginal, urlAcortada });
};

module.exports.redireccionador = async (req, res) => {
  const { urlAcortada } = req.params;
  const url = await baseDeDatos.buscarUnaUrl(urlAcortada);
  if (url) {
    res.redirect(301, url);
  } else {
    res.status(404).send({ mensaje: 'No existe url registrada' });
  }
};
