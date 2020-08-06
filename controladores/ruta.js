const Url = require('../modelos/urls');

module.exports.acortarUrl = async (req, res) => {
  const { urlOriginal, urlAcortada } = req.body;
  const nuevaUrl = new Url({ urlOriginal, urlAcortada, cantidadDeVisitas: 0 });
  await nuevaUrl.save();
  res.status(200).send({ mensaje: 'url creada', urlOriginal, urlAcortada });
};

module.exports.redireccionador = async (req, res) => {
  const { urlAcortada } = req.params;
  console.log(`Url: `, urlAcortada);
  const url = await Url.findOne({ urlAcortada });
  if (!url) {
    return res.status(404).send({ mensaje: 'No existe url registrada' });
  }
  res.redirect(301, url.urlOriginal);
};
