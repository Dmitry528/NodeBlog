const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('register', { title: 'Register Form' });
});

const dbCheck = (req, res, next) => {
  let email = req.body.email;
  let login = req.body.login;

  const userDB = require('../models/register.model');
  userDB.findOne({email: email})
  .then((result) => {
    if(!result){
      console.log('Email is free');
      userDB.findOne({login: login})
      .then((result) => {
        if(!result){
          console.log('Login is free'); 
          next();
        }
        else{
          console.log('Login is already use') 
          res.render('register', { msg: 'login is not free' });
        }
      })
    }
    else{
      console.log('Email is already use'); 
      res.render('register', { msg: 'Email is not free' });
    }
  })

}

const validCheck = (req, res, next) => {
  console.log('We are on valid check on Joi');
  // if password === repassword => joi valid => hash password => saveDB
  // auth
  // lock create post when you are not register => redir to register

  let email = req.body.email;
  let login = req.body.login;
  let password = req.body.password;
  let repassword = req.body.repassword;

  if(password === repassword){
    console.log('Password === repassword');

    const JoiSchema = Joi.object().keys({
      email: Joi.string().email(),
      login: Joi.string().alphanum().min(4).max(16).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).max(16),
    })

    const result = Joi.validate({
      email: email,
      login: login,
      password: password
    }, JoiSchema, (err, result) => {
      if (err) {
        console.log(err);
        //res.render('index', { msg: err.message });
        res.render('register', { msg: err.message });
      }
      else {
        console.log('Validate is okay' + result);
        next();
      }
    })
  }
  else{
    console.log('Password is not === repassword');
    res.render('register', { msg: 'Password is not === repassword' });
  }
}

router.post('/', dbCheck, validCheck, (req, res) => {
  let email = req.body.email;
  let login = req.body.login;
  let password = req.body.password;
  let repassword = req.body.repassword;

  //console.log(`Email: ${email}, Login: ${login}, Password: ${password}, repassword: ${repassword}`);
  console.log('We are on SAve Post!');
  const userDB = require('../models/register.model');
  
  const createUser = new userDB({
    email: email,
    login: login,
    password: bcrypt.hashSync(password, 10)
  });

  createUser.save((err, saved) => {
    if(err){
      console.log(err);
    }
    else{
      console.log(`Saved: ${saved}`);
      res.redirect('http://localhost:3000/signIn');
    }
  })
});

module.exports = router;
