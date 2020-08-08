const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const baseDeDatos = require('../utilidades/baseDeDatos');

module.exports.registrarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const {
    nombre, apellido, alias, correo, contra,
  } = req.body;
  try {
    console.log(nombre, apellido, alias, correo, contra);
    const hashDeContra = await bcrypt.hash(contra, 12);
    await baseDeDatos.registrarUsario({
      nombre, apellido, alias, correo, hashDeContra,
    });
    res.status(200).send({ mensaje: 'usuario creado' });
  } catch (error) {
    console.log(error);
  }
};
