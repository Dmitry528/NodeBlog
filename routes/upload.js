let express = require('express');
let router = express.Router();
const Multer  = require('multer');
var upload = Multer({ dest: './public/uploads/' });

router.post('/', upload.single('file') ,(req, res) => {
    if(req.file){
        global.imageForDB = req.file.filename;
        console.log('Image is');
    }
    else{
        global.imageForDB = 'mainImg.jpg';
        console.log('Image NOT');
    }
});

module.exports = router;