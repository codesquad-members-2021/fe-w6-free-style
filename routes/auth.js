const express = require('express');
const router = express.Router();

// auth: [GET, /auth/login ] 
router.get('/login', (req, res) => {
    res.render('login', { title: 'MD Todo list' });
});

// auth: [GET, /auth/register ] 
router.get('/register', (req, res) => {
    res.render('register', { title: 'MD Todo list' });
});

module.exports = router;