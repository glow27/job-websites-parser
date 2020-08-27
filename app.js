const express = require('express');

const app = express();

const basicRouter = require('./routes/basicRouts');
const middleWare = require('./middleware/index');
const sessionConfig = require('./middleware/sessionConfig');

middleWare(app);
sessionConfig(app);

app.use('/', basicRouter);

module.exports = app;
