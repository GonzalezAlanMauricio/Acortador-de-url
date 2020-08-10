const mongoose = require('mongoose');

const { Schema } = mongoose;

const esquemaDeUsuario = new Schema({
  nombre: Schema.Types.String,
  apellido: Schema.Types.String,
  alias: Schema.Types.String,
  correo: Schema.Types.String,
  hashDeContra: Schema.Types.String,
  urls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Url' }],
}, { timestamps: { createdAt: 'creado_el' } });

module.exports = mongoose.model('Usuario', esquemaDeUsuario);
