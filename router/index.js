var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');

var news_router = require("./crawl/r_naver");
var comment_router = require("./r_comment");
var keep_router = require("./r_keep");
const News = require('../model/main_schema');

router.get('/', async (req, res) => {

   const filter = {
      keep: false
   }
   await News.deleteMany(filter);
   res.sendFile(path.join(__dirname, '../index.html'))
})

router.use('/news', news_router)
router.use('/comment', comment_router)
router.use('/keep', keep_router)

module.exports = router;