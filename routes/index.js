var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var md5 = require('MD5');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res, next){
  res.render('forms/signin');
});

router.post('/signin', function(req, res, next){
  // Log in the user and redirect him to dashboard
  var data = req.body;
  User.findOne({email: data.email}, function(err, user){
    if(err){
      return next(err);
    }

    if(!user){
      return next(new Error('User is not found'));
    }

    if(user.md5password === md5(data.password)){
      return res.redirect('/dashboard')
    }

    return next(new Error('Invalid credentials'));
  });
});

router.get('/signup', function(req, res, next){
  res.render('forms/signup');
});

router.post('/signup', function(req, res, next){
  // Register the user and redirect him to dashboard
  var data = req.body;

  //TODO Details Validation
  var user = new User(data);
  user.md5password = md5(data.password);

  user.save(function(err, savedRecord){
    if(err){
      return next(err);
    }
    res.json(savedRecord);
  })
});

router.get('/dashboard', function(req, res, next){
  res.render('dashboard');
});



module.exports = router;
