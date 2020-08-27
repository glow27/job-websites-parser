const mongoose = require('mongoose')
const Schema = mongoose.Schema

const vacSchema = Schema({
  offer: String,
  salary: String,
  href: String,
  publicDate: String,
  type: String,
})

module.exports = mongoose.model('vacancy-hh', vacSchema)
