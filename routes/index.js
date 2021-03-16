import express from "express";

const router = express.Router();

// index: [GET, / ] 
router.get('/', (req, res) => {
    res.render('index', { title: 'MD Todo list' });
});

export default router;