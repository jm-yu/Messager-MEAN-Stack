var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/', function(req, res, next) {
  var salt = bcrypt.genSaltSync(10);
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, salt),
    email: req.body.email
  })
  user.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
});

router.post('/signin', function (req, res, next) {
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'Login failed!',
        error: {message: 'No such user exists'}
      });
    }
    console.log(user.password);
    console.log(req.body.password);
    console.log(bcrypt.compareSync(req.body.password, user.password));
    if (!bcrypt.compareSync(req.body.password, user.password)){
      console.log()
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Wrong password'}
      });
    }

    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      user_id: user._id
    });
  });
});

module.exports = router;
