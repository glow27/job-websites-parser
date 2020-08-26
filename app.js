const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));

module.exports = app;
