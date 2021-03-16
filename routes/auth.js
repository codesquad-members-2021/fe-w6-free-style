const express = require('express');
// const bcrypt = require('bcrypt');

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
        const checkUser = await User.findOne({where: {userid, userpwd}});
        if (!checkUser) return res.status(401).send('존재하지 않는 아이디입니다.');

        return res.status(200).redirect('/todo');
    } catch (error) {
        console.error(error);
        res.status(500).send('서버에 오류가 있습니다.');
    }
});


// Register 
// auth: [GET, /auth/register ] 
router.get('/register', (req, res) => {
    res.render('register', { title: 'MD Todo list' });
});

// auth: [POST, /auth/register ]  // 보류
router.post('/register', async (req, res) => {
    const { userid, userpwd } = req.body;
    
    try {
        const exUser = await User.findOne({ where: { userid } });

        // 이미 있는 계정   // 409 : Conflict
        if (exUser)            
            return res.status(409).send('이미 가입된 아이디 입니다.');

        // const hash = await bcrypt.hash(userpwd, 12); // 보류

        await User.create({
            userid,            
            userpwd,
        });
        
        return res.status(200).redirect('/todo');

    } catch (error) {                
        console.error(error);
        return res.status(500).send('서버에 오류가 있습니다.');
    }
});

// auth: [GET, /auth/register ] 

module.exports = router;