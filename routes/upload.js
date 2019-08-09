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
        let image = req.file.filename;
        global.imageForDB = image;
    }
    else if(!req.file){
        let image = 'mainImg.jpg'
        global.imageForDB = image;
    }

});

module.exports = router;