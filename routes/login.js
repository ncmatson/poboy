var db = require('../db')

exports.login = function(req, res) {
  res.render('login', {title:'POBOY'});
};

exports.validate = function(req, res) {
  console.log(JSON.stringify(req.body));
  res.redirect('/');
};
