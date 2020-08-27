const express = require('express');

const app = express();

const middleWare = require('./middleware/index');

middleWare(app);

app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;
