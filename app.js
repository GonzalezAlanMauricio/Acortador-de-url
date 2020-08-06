const express = require('express');
const mongoose = require('mongoose');

const app = express();
const puerto = 3000;

const acortadorDeUrl = require('./rutas/acortadorDeUrl');

app.use(express.json());

app.use(acortadorDeUrl);

app.use('/', (req, res, next) => {
  res.status(404).send('Ruta incorrecta');
});

mongoose.connect('mongodb://localhost:27017/Acortador-de-url',
  { useUnifiedTopology: true, useNewUrlParser: true });

app.listen(puerto, () => console.log(`Aplicación corriendo en el puerto: ${puerto}`));
