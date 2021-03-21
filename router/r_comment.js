var express = require('express');
var router = express.Router();
const News = require('../model/main_schema');

router.post('/save', async (req, res) => {
   const {
      _id,
      save,
      comment
   } = req.body.value;

   const update = {
      keep: save,
      comment: comment
   }
   await News.findByIdAndUpdate(_id, update);
})

module.exports = router;