var db = require('../db')

exports.index = function(req, res) {
  var username = req.query.username;
  db.query('SELECT * FROM devices', function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      res.render('index', {title: 'POBOY', user: username, devices: result.rows});
    }
  })
};
