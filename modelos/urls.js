const mongoose = require('mongoose');

const { Schema } = mongoose;

const esquemaDeUrl = new Schema({
  urlOriginal: Schema.Types.String,
  urlAcortada: Schema.Types.String,
  cantidadDeVisitas: Schema.Types.Number,
  usuarioCreador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
}, { timestamps: { createdAt: 'creado_el' } });

module.exports = mongoose.model('Url', esquemaDeUrl);
