const express = require('express');

const middleware = require('./middleware/index')
const parseHH = require('./utils/parser/parseHH')

const app = express();
middleware(app);

const basicRouter = require('./routes/basicRouts');
const middleWare = require('./middleware/index');
const sessionConfig = require('./middleware/sessionConfig');

middleWare(app);
sessionConfig(app);

app.use('/', basicRouter);

module.exports = app;
