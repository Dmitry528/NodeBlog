let express = require('express');
let router = express.Router();
const multer = require('multer');
//const upload = multer({ dest: './public/uploads/' });
//const mongoose = require('mongoose');

router.get('/create', (req, res) => {
    res.render('createBlog');
});

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
    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('prewiew', 'prewiew field is required').notEmpty();
    req.checkBody('category', 'enter category').notEmpty();
    req.checkBody('author', 'enter author').notEmpty();

    //let errors = req.validationErrors();

    req.asyncValidationErrors()
    .then(() => {
        const Posts = require('../models/posts.model');
        const AddPost = new Posts({
            title: title,
            prewiew: prewiev,
            category: category,
            author: author,
            date: date
        });
        AddPost.save()
            .then(() => {
                res.redirect('/');
            })
            .catch(e => console.log(e))
    })
    .catch((errors) => {
        console.log(errors);
        res.redirect('/ddd');
    })
});

router.get('/', (req, res, next) => {
    const Posts = require('../models/posts.model');
    Posts.find({})
    .then((result) => {
        res.render('blogs', {
         info: result 
        })
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })
});

module.exports = router;

