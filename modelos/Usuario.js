const mongoose = require('mongoose');

const { Schema } = mongoose;

const esquemaDeUsuario = new Schema({
  nombre: Schema.Types.String,
  apellido: Schema.Types.String,
  alias: Schema.Types.String,
  correo: Schema.Types.String,
  hashDeContra: Schema.Types.String,
  urls: [{
    urlId: mongoose.Schema.Types.ObjectId,
    urlOriginal: Schema.Types.String,
    urlAcortada: Schema.Types.String,
  }],
}, { timestamps: { createdAt: 'creado_el' } });

module.exports = mongoose.model('Usuario', esquemaDeUsuario);
