const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/result/:result/scores/:scores", function (req, res, next) {
  console.log(`result: ${req.params.result}, scores: ${req.params.scores}`);
  res.send({ result: req.params.result, scores: req.params.scores });
});

module.exports = router;
