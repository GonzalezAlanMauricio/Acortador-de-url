const jwt = require('jsonwebtoken');

module.exports.estaLogueado = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ mensaje: 'Es necesario enviar un token en la cabecera' });
  }
  try {
    jwt.verify(token, process.env.CONTRA_SECRETA_DE_JWT);
    const decodificacion = jwt.verify(token, process.env.CONTRA_SECRETA_DE_JWT);
    req.correoDeUsuario = decodificacion.correo;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).send({ mensaje: 'El token es incorrecto o expiro' });
  }
};
