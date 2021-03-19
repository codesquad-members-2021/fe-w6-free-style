const express = require('express');
const { isUserNotInSession } = require('./util.js');
const router = express.Router();
const { Todo } = require('../models');

// todo: [GET, /todo/ ]
router.get('/', isUserNotInSession('/auth/login'), async (req, res) => {
    const { userid: userDisplayId } = req.session.user;
    res.render('todoPost', { title: 'MD Todo list', userDisplayId });
});

// todo: [POST, /todo/getUserTodoData ]
router.post('/getUserTodoData', isUserNotInSession('/auth/login'), async(req, res) => {
    const { id: userId } = req.session.user;
    try {
        const todoData = await Todo.findAll({ 
            where: { userId },
            attributes: [ 'subject', 'content' ],
        });
        
        return res.status(200).json({
            result: true,
            data: todoData,
            message: 'OK',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            message: '서버에 오류가 있습니다.',
        });
    }
});



// todo: [GET, /todo/write ]
router.get('/write', isUserNotInSession('/auth/login'), (req, res) => {
    const { subject } = req.query;
    const { userid: userDisplayId } = req.session.user;
    res.render('todoWrite', {
        title: 'MD Todo list',
        subject: subject || '',
        userDisplayId,
    });
});

// todo: [GET, /todo/write ]
router.get('/write', isUserNotInSession('/auth/login'), (req, res) => {
    const { subject } = req.query;
    const { userid: userDisplayId} = req.session.user;
    res.render('todoWrite', { title: 'MD Todo list', subject: subject || '', userDisplayId });
});

// todo: [POST, /todo/write ] (작성 글 전송)
router.post('/write', isUserNotInSession('/auth/login'), async (req, res) => {
    const { subject, content } = req.body;
    const { id: userId } = req.session.user;
    try {
        const createTodo = await Todo.create({ subject, content, userId });
        if (!createTodo) return res.redirect('/todo/write');

        return res.redirect('/todo');
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
