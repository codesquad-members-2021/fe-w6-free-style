var express = require('express');
var router = express.Router();
const News = require('../model/main_schema');

router.get('/', async (req, res) => {
   const keepData = await News.find({
      keep: true
   });
   res.json(keepData);
})

module.exports = router;