const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    const page = req.query.page;
    renderRequestedPage(res, page);
});

const renderRequestedPage = (res, page) => {
    switch(page){
        case "index":
            res.render('index');
            break;
        case "products":
            res.render('products');
            break;
        case "brandstory":
            res.render('brandstory');
            break;
    }
}

module.exports = router;
