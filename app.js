const express = require('express');

const middleware = require('./middleware/index')
const authRouter = require('./routes/auth')
const vacancyRouter = require('./routes/vacancy')
const basicRouter = require('./routes/basicRouts');
const cvRouter = require('./routes/cv')

const seeder = require('./utils/parser/parseHH')

const app = express();
middleware(app);


// seeder('https://spb.superjob.ru/vacancy/search/?keywords=%D0%B2%D0%B5%D0%B1%20%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%87%D0%B8%D0%BA&page=1', 'vacancy')

app.use('/api/auth', authRouter)
app.use('/api/vacancy', vacancyRouter)
app.use('/api/cv', cvRouter)
app.use('/', basicRouter);


module.exports = app;
