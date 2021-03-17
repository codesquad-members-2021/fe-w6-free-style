const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("logins/login");
})

router.get('/fail', (req, res) => {
    res.render("logins/fail");
})


module.exports = router;