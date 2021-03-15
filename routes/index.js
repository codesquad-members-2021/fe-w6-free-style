const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.get("/result", function (req, res, next) {
//   const type = req.query.type;
//   const scores = req.query.scores;
//   res.send({ type, scores });
// });

module.exports = router;
