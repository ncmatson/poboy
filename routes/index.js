var db = require('../db')

exports.index = function(req, res) {
  db.query('SELECT * FROM devices WHERE username = $1::text', [req.user.username], function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      res.render('index', {title: 'POBOY', devices: result.rows});
    }
  })
};
