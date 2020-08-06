const Url = require('../modelos/urls');

module.exports.guardarNuevaUrl = async (urlOriginal, urlAcortada) => {
  try {
    const nuevaUrl = new Url({ urlOriginal, urlAcortada, cantidadDeVisitas: 0 });
    await nuevaUrl.save();
  } catch (error) {
    console.error('Error: ', error);
  }
};

module.exports.buscarUnaUrl = async (urlAcortada) => {
  const url = await Url.findOne({ urlAcortada });
  return url;
};

module.exports.urlAcortadaExiste = async (urlAcortada) => {
  const url = await Url.findOne({ urlAcortada });
  console.log(`Url: `, url);
  console.log(`Url: `, !!url);
  return !!url;
};
