let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('admin');
});

// router.put('/', (req, res) => {

// })

router.post('/', (req, res) => {
    let value = req.body.value;

    const posts = require('../models/posts.model');
    posts.deleteOne({_id : value}, (err, res) => {
        if(err){
            console.log(err, 'ERROR');
        }
        else{
            console.log(res, ' NOT ERROR');
            // res.render('admin', {
            //     //smg: 'Post Deleted'
            // })   
        }
    })
})

module.exports = router;