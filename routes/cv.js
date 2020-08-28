const express = require('express');
const router = express.Router();

const CV = require('../models/CV');

router.route('/')
  .get(async (req, res) => {
    const limit = 10;
    const startInd = limit * (req.query.page - 1);
    const endInd = startInd + limit;
    let next = +req.query.page + 1;
    let prev = +req.query.page - 1;
    const arr = await CV.find({}).limit(51);
    const onePage = arr.slice(startInd, endInd);
    const total = Math.ceil(arr.length / limit);
    if (prev <= 0) prev = false;
    if (next > total) next = false;
    const pages = [];
    for (let i = 1; i <= total; i += 1) {
      pages.push({ num: i });
    }
    res.render('resume', { onePage, pages, prev, next });
  });

module.exports = router;
