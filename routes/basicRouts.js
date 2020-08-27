const express = require('express');

const router = express.Router();
const Vacancy = require('../models/Vacancy');

router.get('/', async (req, res) => {
  const limit = 5;
  const startInd = limit * (req.query.page - 1);
  const arr = await Vacancy.find({}).limit(32);
  const onePage = arr.slice(startInd, startInd + limit);
  const total = Math.ceil(arr.length / limit);
  const pages = [];
  for (let i = 1; i <= total; i += 1) {
    pages.push({ num: i });
  }
  res.render('index', { onePage, pages });
});

// router.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.clearCookie('user_sid');
//   res.redirect('/');
// });

module.exports = router;
