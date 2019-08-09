let express = require('express');
let router = express.Router();
const multer = require('multer');
const Joi = require('joi');
const Multer  = require('multer');
var upload = Multer({ dest: './public/uploads/' });

router.get('/create', (req, res) => {
    res.render('createBlog');
});

router.get('/single', (req, res) => {
    res.render('singleBlog', {
        title: 'Single Blog'
    });
});

// POST

// chek if user is register
// lock create post when you are not register => redir to register COOKIE TIME LIFE
// multer WHY REQ BODY IS EMPTY &&&&&&&&&&&&&
// no encrype multer
// One Post
// Validation Auth


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

router.post('/create', valid_data, upload.single('file') ,(req, res) => {
    console.log(req.file);

    let title = req.body.title;
    let prewiev = req.body.prewiew;
    let category = req.body.category;
    let author = req.body.author;
    
    if (req.file) {
        var mainimage = req.files;
    }
    else {
        var mainimage = 'mainImg.jpg';
        console.log('This must be default img');
        console.log(req.file);
    }

    const Posts = require('../models/posts.model');

    const AddPost = new Posts({
        title: title,
        prewiew: prewiev,
        category: category,
        author: author,
        mainimage: mainimage,
    });
    console.log(mainimage);
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
    Posts.find({}).limit(6)
    .then((result) => {
        console.log(result);
        res.render('blogs', {
            info: result 
        })
    })
    .catch((err) => {
        console.log(err);
    })
});

// router.post('/create', upload.single('img'), function (req, res, next) {
//     // req.file - файл `avatar`
//     // req.body сохранит текстовые поля, если они будут
//     console.log(req.file);
//   })

module.exports = router;