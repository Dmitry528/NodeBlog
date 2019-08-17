const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
/* GET home page. */
const auth = (req, res, next) => {
  // JWT DECODED HERE AND WE PUT JWI INTO COOCIES IN SIGN IN
  let decoded = jwt.verify(req.cookies.auth, "shhhhh");
  if(decoded.auth === 'true'){
    console.log('JWT decoded is true');
    next();
  }
  else{
    res.render('signIn');
  }
}

router.get('/', auth, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  let categoryFind = req.body.selectCateg;

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
