let express = require('express');
let router = express.Router();
const Multer  = require('multer');
var upload = Multer({ dest: './public/uploads/' });

router.post('/', upload.single('file') ,(req, res) => {
    if(req.file){
        var filename = req.file.filename;
    }
    else{
        var filename = 'mainImg.jpg';
    }
    const modelBlog = require('../models/posts.model');
    let saveFile = new modelBlog({
        mainimage: filename
    })
    saveFile.save();
});

module.exports = router;