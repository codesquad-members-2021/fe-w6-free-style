const express = require("express");
const router = express.Router();
const jsonData = require('../response.json');

router.get("/", (req, res) => {
    res.send(jsonData);
    // const productID = req.query.id;
    // sendReqProductData(res, productID);
});

function sendReqProductData(res, id) {

}

module.exports = router;