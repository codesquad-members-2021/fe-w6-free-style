const express = require('express');
const Article = require('./../models/article');
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

function authIsOwner(req, res) {
    if (req.session.is_logined) return true;
    else return false;
}

router.post('/login_process', async (req, res) => {
    const post = req.body;
    const password = post.pwd;

    if(password === authData.password) {
        req.session.is_logined = true,
        req.session.nickname = authData.nickname;
        await res.redirect("/");
    } else {
        res.render("logins/fail");
    }
})

module.exports = router;