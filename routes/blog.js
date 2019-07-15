let express = require('express');
let router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    res.render('blogs', {
        title: 'List of blogs'
    });
});

router.get('/create', (req, res) => {
    res.render('createBlog');
})

router.get('/single', (req, res) => {
    res.render('singleBlog', {
        title: 'Single Blog'
    });
});

// POST

router.post('/create', (req, res) => {
    let title = req.body.title;
    let category = req.body.category;
    let post = req.body.post;
    let author = req.body.author;
    let date = new Date();
});

module.exports = router;

