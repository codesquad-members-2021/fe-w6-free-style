import express from "express";

const router = express.Router();

// todo: [GET, /todo/ ] 
router.get('/', (req, res) => {
    res.render('todo', { title: 'MD Todo list' });
});

export default router;