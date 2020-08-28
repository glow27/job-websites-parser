const express = require('express')
const router = express.Router();
const Vacancy = require('../models/Vacancy');

router.route('/')
  .get(async (req, res) => {
    const limit = 8;
    const startInd = limit * (req.query.page - 1);
    const endInd = startInd + limit;
    let next = +req.query.page + 1;
    let prev = +req.query.page - 1;
    const arr = await Vacancy.find({}).limit(120);
    const onePage = arr.slice(startInd, endInd);
    const total = Math.ceil(arr.length / limit);
    if (prev <= 0) prev = false;
    if (next > total) next = false;
    const pages = [];
    for (let i = 1; i <= total; i += 1) {
      pages.push({ num: i });
    }
    res.render('index', { onePage, pages, prev, next });
  });

module.exports = router;
