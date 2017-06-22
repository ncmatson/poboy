/*
 * GET home....
 */

exports.index = function(req, res) {
  res.app.get('connection').query('SELECT * FROM devices', function(err, result){
    if (err) {
      res.send(err);
    }
    else {
      res.render('index', {title: 'POBOY', devices: result.rows});
    }
  })
};
