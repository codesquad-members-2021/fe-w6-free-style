const express = require('express');
const router = express.Router();

/* 디폴트 홈페이지 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
