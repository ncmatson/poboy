var db = require('../db')

exports.add_device = function(req, res) {
  var name = req.body.NAME;
  var status = req.body.STATUS;
  console.log('adding device', name);

  db.query('SELECT * FROM devices WHERE devicename = $1::text', [name], function (err, result){
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (result.rows.length > 0) {
        console.log('device already exists');
        res.redirect('/');
      }
      else {
        db.query('INSERT INTO devices VALUES (DEFAULT, DEFAULT, $1::text, $2::boolean)', [name, status], function(err) {
          if (err) {
            res.send(err);
          } else {
            res.redirect('/');
          }
        });
      }
    }
  });
};

exports.update_device = function(req, res) {
  var name = req.body.NAME;
  var status = (req.body.STATUS == 'true' ? true : false);
  db.query('UPDATE devices SET status = $1::bool WHERE devicename = $2::text', [status, name], function (err){
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
};

exports.delete_device = function(req, res) {
  var name = req.body.NAME;
  db.query('DELETE FROM devices WHERE devicename = $1::text', [name], function(err){
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.redirect('/');
    }
  });
};

exports.check_status = function(req, res) {
  var name = req.params.device_name;
  db.query('SELECT status FROM devices WHERE devicename = $1::text', [name], function(err, result){
    if (err) {
      console.log(err);
    } else {
      if (result.rows.length > 0)
      {
        res.send(result.rows[0].status);
      }
      else{
        res.send('error, device not found');
      }
    }
  })
}
