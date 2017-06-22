exports.add_device = function(req, res) {
  var name = req.body.NAME;
  var status = req.body.STATUS;

  req.app.get('connection').query('INSERT INTO devices VALUES (DEFAULT, $1::text, $2::boolean)', [name, status], function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
};

exports.update_device = function(req, res) {
  var name = req.body.NAME;
  var status = (req.body.STATUS == 'true' ? true : false);
  req.app.get('connection').query('UPDATE devices SET status = $1::bool WHERE name = $2::text', [status, name], function (err){
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
};
