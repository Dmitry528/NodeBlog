const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  let categoryFind = req.body.selectCateg;
  //console.log(categoryFind);

  const categoryDB = require('../models/posts.model');
  categoryDB.find({category: categoryFind})
    .then((result) => {
      console.log(result);
      res.render('index', {
        info: result
      })
    })
    .catch((err) => {
      console.log(err);
    })
});

module.exports = router;
