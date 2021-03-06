const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const { Schema } = mongoose;

const esquemaDeUrl = new Schema({
  urlOriginal: Schema.Types.String,
  urlAcortada: { type: Schema.Types.String, unique: true },
  cantidadDeVisitas: Schema.Types.Number,
  usuarioCreador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
}, { timestamps: { createdAt: 'creado_el' } });

module.exports = mongoose.model('Url', esquemaDeUrl);
