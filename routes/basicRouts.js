const express = require('express');
const getDescription = require('../utils/parser/getMoreInfo');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main');
});

router.post('/info', async (req, res) => {
  const addInfo = await getDescription(req.body.id);
  res.send(addInfo);
});

module.exports = router;
