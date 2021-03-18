// 현재 비번 암호화 안되어있음. 할게 너무 많아서 일단 미룸..

const express = require('express');

const router = express.Router();
const { User } = require('../models');

// Login
// auth: [GET, /auth/login ]
router.get('/login', (req, res) => {
    res.render('login', { title: 'MD Todo list' });
});

// auth: [POST, /auth/login ]
router.post('/login', async (req, res) => {
    const { userid, userpwd } = req.body;

    try {
        const checkUser = await User.findOne({ where: { userid, userpwd } });
        if (!checkUser)
            return res.redirect('login');        

        return res.redirect('/todo');
    } catch (error) {        
        console.error(error);
    }
});

// auth: [POST, /auth/userCheck ], 로그인 전 계정 확인.
router.post('/userCheck', async (req, res) => {
    const { userid, userpwd } = req.body;
    try {
        const isUser = await User.findOne({ where: { userid, userpwd } });        
        if (!isUser)
            return res.status(401).json({ result: false, message: '계정이 없거나, 정보를 잘못 입력하셨습니다.' });    

        return res.status(200).json({ result: true, message: 'OK' });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            message: '서버에 오류가 있습니다.',
        });
    }
});

// ----------------------------------------------------------

// Register
// auth: [GET, /auth/register ]
router.get('/register', (req, res) => {
    res.render('register', {  title: 'MD Todo list' });
});

// auth: [POST, /auth/register ]
router.post('/register', async (req, res) => {
    const { userid, userpwd } = req.body;

    try {
        const exUser = await User.findOne({ where: { userid } });        
        if (exUser)
            return res.redirect('register');        

        const createUser = await User.create({ userid, userpwd });
        if (!createUser) 
            return res.redirect('register');

        return res.redirect('/todo');
    } catch (error) {
        console.error(error);
    }
});

// auth: [POST, /auth/isDuplicateID ], 아이디 중복확인
router.post('/isDuplicateID', async (req, res) => {
    const { userid } = req.body;
    try {
        const exUser = await User.findOne({ where: { userid } });        
        if (exUser)
            return res.status(409).json({ result: true, message: '이미 가입된 아이디입니다.' });    

        return res.status(200).json({ result: false, message: 'OK' });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            message: '서버에 오류가 있습니다.',
        });
    }
});



module.exports = router;
