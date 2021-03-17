const express = require('express');

const router = express.Router();

// todo: [GET, /todo/ ] 
router.get('/', (req, res) => {
    res.render('todoPost', { title: 'MD Todo list' });
});

// todo: [GET, /todo/write ] 
router.get('/write', (req, res) => {
    res.render('todoWrite', { title: 'MD Todo list' });
});

module.exports = router;