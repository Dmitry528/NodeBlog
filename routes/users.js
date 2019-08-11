var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
});

router.get('/users', (req, res) => {
  let users = require('../models/register.model');
  users.find({})
  .then((result) => {
    res.send(result);
  })
})

router.get('/posts', (req, res) => {
  let posts = require('../models/posts.model');
  posts.find({})
    .then((result) => {
      res.send(result);
    })
})

module.exports = router;
