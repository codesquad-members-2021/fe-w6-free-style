const express = require("express");
const router = express.Router();
const allProductData = require('../response/allProducts.json');

router.get("/", (req, res) => {
    res.send(allProductData);
    // const productID = req.query.id;
    // sendReqProductData(res, productID);
});

function sendReqProductData(res, id) {

}

module.exports = router;