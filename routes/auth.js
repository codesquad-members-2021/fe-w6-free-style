const express = require('express');

const router = express.Router();
const { User } = require('../models');

// Login
// auth: [GET, /auth/login ]
router.get('/login', (req, res) => {
    res.render('login', { 
        title: 'MD Todo list', 
        errorMessage: req.flash('errorMessage')[0],
    });
});

// auth: [POST, /auth/login ]
router.post('/login', async (req, res) => {
    const { userid, userpwd } = req.body;

    try {
        const checkUser = await User.findOne({ where: { userid, userpwd } });
        if (!checkUser) {
            req.flash('errorMessage', '잘못 입력하셨거나 존재하지 않는 계정입니다.');
            return res.redirect('login');
        }

        return res.redirect('/todo');
    } catch (error) {        
        console.error(error);
        req.flash('errorMessage', '서버에 오류가 있습니다.');
        return res.redirect('login');
    }
});
// ----------------------------------------------------------

// Register
// auth: [GET, /auth/register ]
router.get('/register', (req, res) => {
    res.render('register', { 
        title: 'MD Todo list', 
        errorMessage: req.flash('errorMessage')[0],
    });
});

// auth: [POST, /auth/register ]  // 보류
router.post('/register', async (req, res) => {
    const { userid, userpwd } = req.body;

    try {
        const exUser = await User.findOne({ where: { userid } });
        
        if (exUser) {
            req.flash('errorMessage', '이미 가입된 아이디 입니다.');
            return res.redirect('register');
        }

        await User.create({ userid, userpwd });
        return res.redirect('/todo');
    } catch (error) {
        console.error(error);
        req.flash('errorMessage', '서버에 오류가 있습니다.');
        return res.redirect('login');
    }
});

module.exports = router;
