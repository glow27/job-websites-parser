const express = require('express');
const CV = require('../models/CV')
const Vacancy = require('../models/Vacancy')
const router = express.Router();

router.get('/', async (req, res) => {
  const cv = await CV.find({}).limit(5)
  const vacancy = await Vacancy.find({}).limit(5)
  res.render('main', {arr:[cv, vacancy]});
});

module.exports = router;
