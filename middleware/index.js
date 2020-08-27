module.exports = function(app) {
  const express = require('express')
  const morgan = require('morgan')
  const cookieParser = require('cookie-parser')
  const path = require('path')
  const keys = require('../keys/keys')
  const mongoose = require('mongoose')
  console.log(keys.mongoKey)

  mongoose.connect(keys.mongoKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  app.use(morgan('dev'))
  app.use(express.urlencoded({extended: true}))
  app.use(express.json())
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, '..', './public')))

  app.set('view engine', 'hbs')
  app.set('views', path.join(__dirname, '..', './views'))
}
