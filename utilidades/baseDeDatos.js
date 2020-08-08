const Url = require('../modelos/urls');
const Usuario = require('../modelos/Usuario');

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
  console.log('Url: ', url);
  console.log('Url: ', !!url);
  return !!url;
};

module.exports.registrarVisita = async (urlAcortada) => {
  try {
    await Url.findOneAndUpdate({ urlAcortada }, { $inc: { cantidadDeVisitas: 1 } });
  } catch (error) {
    console.log(error);
  }
};

module.exports.registrarUsario = async ({
  nombre, apellido, alias, correo, hashDeContra,
}) => {
  try {
    await Usuario.create({
      nombre, apellido, alias, correo, hashDeContra,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.correoExisteEnLaDB = async (correo) => {
  const usuario = await Usuario.findOne({ correo });
  return !!usuario;
};

module.exports.aliasExisteEnLaDB = async (alias) => {
  const usuario = await Usuario.findOne({ alias });
  return !!usuario;
};

module.exports.getUsuario = async (correo) => {
  const usuario = await Usuario.findOne({ correo });
  return usuario;
};
