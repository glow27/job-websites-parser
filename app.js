const express = require('express');

const middleware = require('./middleware/index')
const parseHH = require('./utils/parser/parseHH')

const app = express();
middleware(app);


middleWare(app);

app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;
