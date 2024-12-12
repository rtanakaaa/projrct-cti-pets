const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname));
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});