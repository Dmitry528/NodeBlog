let express = require('express');
let router = express.Router();

const Joi = require('joi');

const auth = (req, res, next) => {
    console.log('Chek there JWT');
    next();   
}

router.get('/create', auth ,(req, res) => {
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
        category: Joi.string().required(),
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

router.post('/create', valid_data ,(req, res) => {

    let title = req.body.title;
    let prewiev = req.body.prewiew;
    let category = req.body.category;
    let author = req.body.author;

    // const image = require('./upload');
    // console.log(image);
    const Posts = require('../models/posts.model');

    const AddPost = new Posts({
        title: title,
        prewiew: prewiev,
        category: category,
        author: author,
        mainimage: imageForDB
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
    Posts.find({}).limit(9)
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