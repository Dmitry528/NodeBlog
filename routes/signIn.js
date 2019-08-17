const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// const chekAuth = require('./auth.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signIn', { title: 'Sign In' });
});

router.post('/', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  //console.log(`Email ${email}, Password ${password}`);
  const dbUser = require('../models/register.model');
  dbUser.findOne({email: email})
  .then((result) => {
    if(!result){
      console.log('Incorrect Email or password');
      res.render('signIn', { msg: 'Incorrect Email or password' });
    }
    else{
      console.log('Email is okay');
      bcrypt.compare(password, result.password)
      .then((result) => {
        console.log(result);
        if(result === true){
          
          let token = jwt.sign({auth: 'true'}, 'shhhhh');
          res.cookie('auth', token);
          // GET JWT TOKEN
          // Passport js for secure log
          res.redirect('http://localhost:3000/blog/create');
          //console.log(req.cookies);
        }
        else{
          console.log('Incorrect Email or password');
          res.render('signIn', { msg: 'Incorrect Email or password'});
        }
      })
    }
  })
});

module.exports = router;
