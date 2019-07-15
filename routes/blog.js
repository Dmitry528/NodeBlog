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
    let prewiev = req.body.prewiew;
    let category = req.body.category;
    let author = req.body.author;
    let date = new Date();

    console.log(`Title: ${title}, prewiev: ${prewiev}, category: ${category}, author: ${author}, date: ${date}`);
    res.redirect('/');
    //parse date > model schema > go data Into DB
});

module.exports = router;

