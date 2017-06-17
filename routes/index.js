/*
 * GET home....
 */

exports.index = function(req, res) {
  res.app.get('connection').query('SELECT * FROM devices', function(err, rows){
    if (err) {
      res.send(err);
    }
    else {
      console.log(JSON.stringify(rows.rows));
      res.render('index', {title: 'POBOY', devices: rows.rows});
    }
  })
};
