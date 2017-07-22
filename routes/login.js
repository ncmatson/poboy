var db = require('../db')
var User = require('../model/user.js')
var passport = require('../passport')

exports.login = function(req, res) {
  res.locals.message = req.flash('message');
  res.render('login', { title:'POBOY'});
};

exports.validate = function(req, res) {
  username = req.body.username;
  password = req.body.password;

  if (req.body.login == "register"){
    var user = new User(username, password);
    user.save(username, password, function(user){
      //if null then already exists
      if (user == null) {
        req.flash('message', 'that username already exists try again');
        res.redirect('/login');
      }
      else if (user == username) {
        res.redirect('/?username=' + username);
      }
      else {
        res.render(err);
      }
    });
  }

  else if (req.body.login == "login"){
    console.log("na");
    res.redirect('/');
  }
};
