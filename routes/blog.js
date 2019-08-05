let express = require('express');
let router = express.Router();
const multer = require('multer');
//const upload = multer({ dest: './public/uploads/' });
//const mongoose = require('mongoose');
// var moment = require('moment');
const Joi = require('joi');

router.get('/create', (req, res) => {
    res.render('createBlog');
});

router.get('/single', (req, res) => {
    res.render('singleBlog', {
        title: 'Single Blog'
    });
});

// POST
const valid_data = (req, res, next) => {
    let title = req.body.title;
    let prewiev = req.body.prewiew;
    let category = req.body.category;
    let author = req.body.author;

    const schemaPost = Joi.object().keys({
        title: Joi.string().required().min(5),
        prewiew: Joi.string().required().min(5),
        category: Joi.string().required().min(5),
        author: Joi.string().required().min(5)
    });
    schemaPost.validate({
        title: title,
        prewiew: prewiev,
        category: category,
        author: author
    }, (err, value) =>  { 
        if(err){
            console.log(err);
            res.render('createBlog', {msg: err.details[0].message});
        }
        else{
            console.log('Nice valid');
            next();
        }
    });
}

router.post('/create', valid_data, (req, res) => {
    let title = req.body.title;
    let prewiev = req.body.prewiew;
    let category = req.body.category;
    let author = req.body.author;

    const Posts = require('../models/posts.model');

    const AddPost = new Posts({
        title: title,
        prewiew: prewiev,
        category: category,
        author: author,
    });
    AddPost.save((err, result) => {
        if(err){
            console.log(err);
        }
        else{
           console.log('Saved' + result); 
           res.redirect('http://localhost:3000/blog');
        }
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

// MULTER