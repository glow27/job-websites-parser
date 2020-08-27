const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.redirect('/');
});

module.exports = router;
