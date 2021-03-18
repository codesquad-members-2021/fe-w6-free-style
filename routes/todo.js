const express = require('express');

const router = express.Router();

// todo: [GET, /todo/ ] 
router.get('/', (req, res) => {
    if (!req.session.user)
        return res.redirect('/auth/login');
    res.render('todoPost', { title: 'MD Todo list' });
});

// todo: [GET, /todo/write ] 
router.get('/write', (req, res) => {
    if (!req.session.user)
        return res.redirect('/auth/login');

    const { subject } = req.query;
    res.render('todoWrite', { title: 'MD Todo list', subject: subject || '' });
});
    

module.exports = router;