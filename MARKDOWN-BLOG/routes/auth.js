const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render("logins/login");
})

router.get('/fail', (req, res) => {
    res.render("logins/fail");
})

const authData = {
    password: '111111',
    nickname: 'goody'
}

router.get('/login_process', (req, res) => {
    res.render("logins/process");
})

router.post('/login_process', (req, res) => {
    const post = req.body;
    const password = post.pwd;
    if(password === authData.password) {
        res.send("welcome");
    } else {
        res.send("wrong!");
    }
    // res.redirect('/');
})

module.exports = router;