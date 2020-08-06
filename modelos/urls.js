const mongoose = require('mongoose');

const { Schema } = mongoose;

const esquemaDeUrl = new Schema({
  urlOriginal: Schema.Types.String,
  urlAcortada: Schema.Types.String,
  cantidadDeVisitas: Schema.Types.Number,
});

module.exports = mongoose.model('Url', esquemaDeUrl);
