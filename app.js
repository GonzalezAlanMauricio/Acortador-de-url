const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const puerto = process.env.PUERTO;

const acortadorDeUrl = require('./rutas/acortadorDeUrl');
const rutasDeUsuario = require('./rutas/usuario');

app.use(express.json());

app.set('etag', false);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(cors());

app.use(acortadorDeUrl);
app.use('/usuario/', rutasDeUsuario);

app.use('/', (req, res, next) => {
  res.status(404).send('Ruta incorrecta');
});

mongoose.connect(process.env.URI_MONGODB,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

app.listen(puerto, () => console.log(`Aplicación corriendo en el puerto: ${puerto}`));

module.exports = app;
