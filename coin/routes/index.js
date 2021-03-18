var express = require('express');
var router = express.Router();

require('dotenv').config();
console.log(process.env.id)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

module.exports = router;
