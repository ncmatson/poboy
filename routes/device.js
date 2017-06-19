exports.add_device = function(req, res) {
  console.log('here ' + JSON.stringify(req.body.device));
  var name = req.body.device.NAME
  var status = req.body.device.STATUS;

  req.app.get('connection').query('INSERT INTO devices VALUES (DEFAULT, $1::text, $2::boolean)', [name, status], function(err) {
    if (err) {
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
};
