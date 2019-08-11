let express = require('express');
let router = express.Router();
const Multer  = require('multer');
var upload = Multer({ dest: './public/uploads/' });

router.post('/', upload.single('file') ,(req, res) => {
    // const modelBlog = require('../models/posts.model');
    // let saveFile = new modelBlog({
    //     mainimage: req.file.filename
    // })
    // multer

    if(req.file){
        //let image = req.file.filename;
        global.imageForDB = req.file.filename;
    }
    else{
        //let image = 'mainImg.jpg'
        global.imageForDB = 'mainImg.jpg';
    }
    //res.render('createBlog');

});

module.exports = router;