const express = require('express');
const router = express.Router();
const items = require('../data/homeContents.json');

router.get('/', (req, res) => {
    const i = req.query.index;
    const item = items.contents[i].eventContent;
    res.send(item);
});

module.exports = router;