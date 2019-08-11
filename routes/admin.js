let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('admin');
});

// router.put('/', (req, res) => {

// })

router.post('/', (req, res) => {
    let value = req.body.value;

    const posts = require('../models/posts.model')
    posts.deleteOne({_id : value})
    .then((result) => {
        console.log(result, 'Its Fine');
        res.render('admin', {
            smg: 'Post was delete'
        })
    })
    .catch((err) => console.log(err))
})

module.exports = router;