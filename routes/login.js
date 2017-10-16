var db = require('../db')
var User = require('../model/user.js')

exports.loginPage = function(req, res) {
  res.locals.message = req.flash('message');
  res.render('login', { title:'POBOY'});
};

// first time user
exports.register = function(req, res) {
  username = req.body.username;
  password = req.body.password;

  var user = new User(username, password);
  user.save(username, password, function(user){
    //if null then already exists
    if (user == null) {
      req.flash('message', 'that username already exists try again');
      res.redirect('/login');
    }
    else if (user.username == username) {
      req.session.user = user;
      res.redirect('/');
    }
    else {
      console.log('something real weird');
      res.render('bad...');
    }
  });
};

// existing user
exports.login = function(req, res) {
  username = req.body.username;
  password = req.body.password;

  console.log("na");
  var user = new User(username, password);

  user.findOne(username, function(err, user){
    if (err) {
      console.log('obvi bad');
      req.flash('message', 'somesort of error');
      res.redirect('/login');
    }
    if (user == null) {
      console.log('it ain\'t there');
      req.flash('message', 'invalid username');
      res.redirect('/login');
    }
    else if (user.password != password){
      req.flash('message', 'incorrect password');
      res.redirect('/login');
    }
    else {
      console.log('ya did it!');
      req.session.user = user;
      res.redirect('/?username=' + user.username);
    }

  })
};

exports.loginMobile = function(req, res) {
  username = req.body.username;
  password = req.body.password;

  console.log("na");
  var user = new User(username, password);

  user.findOne(username, function(err, user){
    if (err) {
      console.log('obvi bad');
    }
    if (user == null) {
      console.log('it ain\'t there');
      return('bad');
    }
    else if (user.password != password){
    }
    else {
      console.log('ya did it!');
      res.redirect('/?username=' + user.username);
    }

  })
};
