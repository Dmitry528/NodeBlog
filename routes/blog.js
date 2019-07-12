const express = require('express');
const router = express.Router();

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
    // this router created for POST requests
    // if okay (in schema) go to database!
});

module.exports = router;

