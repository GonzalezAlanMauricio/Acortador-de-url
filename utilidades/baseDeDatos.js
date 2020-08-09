const Url = require('../modelos/urls');
const Usuario = require('../modelos/Usuario');

module.exports.guardarNuevaUrl = async (urlOriginal, urlAcortada, correoDeUsuario) => {
  try {
    const usuarioCreador = await Usuario.findOne({ correo: correoDeUsuario });
    const nuevaUrl = new Url({
      urlOriginal, urlAcortada, cantidadDeVisitas: 0, usuarioCreador: usuarioCreador._id,
    });
    await nuevaUrl.save();
    // const urlsActualizadas = usuarioCreador.urls.push({ urlId: nuevaUrl._id });
    await Usuario.findOneAndUpdate({ correo: usuarioCreador }, { $push: { urls: nuevaUrl } });
  } catch (error) {
    throw new Error('Error en el servidor, lo solucionaremos pronto');
  }
};

module.exports.buscarUnaUrl = async (urlAcortada) => {
  const url = await Url.findOne({ urlAcortada });
  return url;
};

module.exports.urlAcortadaExiste = async (urlAcortada) => {
  const url = await Url.findOne({ urlAcortada });
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
