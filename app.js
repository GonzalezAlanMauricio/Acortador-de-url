const express = require('express')
const app = express()
const puerto = 3000

app.get('/', (req, res) => res.send('¡Hola mundo!'))

app.get('/:urlCorta', (req, res) => {
  const urlCorta = req.params.urlCorta;
  switch (urlCorta) {
    case 'aa':
      res.redirect('http://www.google.com');
      break;

    default:
      res.redirect('http://www.facebook.com');
      break;
  }
  res.send(req.params.urlCorta)
})

app.listen(puerto, () => console.log(`Aplicación corriendo en el puerto: ${puerto}`))