const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
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
    const hashDeContra = await bcrypt.hash(contra, 12);
    await baseDeDatos.registrarUsuario({
      nombre, apellido, alias, correo, hashDeContra,
    });
    res.status(200).send({ mensaje: 'usuario creado' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: 'El servidor tiene un error, lo solucionaremos en un momento' });
  }
};

module.exports.loginDeUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  const { correo, contra } = req.body;
  try {
    const usuario = await baseDeDatos.getUsuario(correo);
    const contraEsCorrecta = await bcrypt.compare(contra, usuario.hashDeContra);
    if (contraEsCorrecta) {
      const token = jwt.sign({ correo }, process.env.CONTRA_SECRETA_DE_JWT, { expiresIn: '1h' });
      res.status(200).send({ mensaje: 'login correcto', token });
    } else {
      res.status(403).send({ mensaje: 'contraseña incorrecta' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: 'El servidor tiene un error, lo solucionaremos en un momento' });
  }
};

module.exports.perfil = async (req, res) => {
  const { correoDeUsuario } = req;
  try {
    const usuario = await baseDeDatos.getUsuario(correoDeUsuario);
    res.send({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      alias: usuario.alias,
      correo: usuario.correo,
      urls: usuario.urls,
      creado: usuario.creado_el,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ mensaje: 'El servidor tiene un error, lo solucionaremos en un momento' });
  }
};
