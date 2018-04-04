var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');
var Message = require('../models/message');
var User = require('../models/user');


router.get('/', function(req, res, next) {
  Message.find().populate('user', 'firstName')
    .exec(function (err, messages) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: messages
      });
    });
});

router.use('/', function (req, res, next) {
  jwt.verify(req.query.token, 'secret', function (err, decoded){
    if (err) {
      //console.log(err.name);
      //console.log(err);
      res.status(500).json(JSON.stringify(err));
      console.log(res);
      return res;
    }
    next();
  });
});

router.post('/', function(req, res, next){
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    var message = new Message({
      content: req.body.content,
      user: user
    });
    message.save(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      user.messages.push(result._id);
      res.status(201).json({
        message: 'Saved message',
        obj: result
      });
      user.save();
    });
  })

});

router.patch('/:id', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message Not Found'}
      });
    }
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    message.content = req.body.content;
    message.save(function (req, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(201).json({
        message: 'Updated Message',
        obj: result
      })
    });
  })
});

router.delete('/:id', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function (err, message) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!message) {
      return res.status(500).json({
        title: 'No Message Found!',
        error: {message: 'Message Not Found'}
      });
    }
    console.log(message.user);
    console.log(decoded.user_id);
    if (message.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message: 'Users do not match'}
      });
    }
    message.remove(function (req, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted Message',
        obj: result
      });
    });
  });
});


module.exports = router;
