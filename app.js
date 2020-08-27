const express = require('express');

const middleware = require('./middleware/index')
const parseHH = require('./utils/parser/parseHH')

const app = express();
middleware(app);

const basicRouter = require('./routes/basicRouts');
const middleWare = require('./middleware/index');

middleWare(app);

app.use('/', basicRouter);

module.exports = app;
