/*
 * GET home....
 */

exports.index = function(req, res) {
  res.render('index', {title : 'POBOY', stuff:JSON.stringify(process.env)});
};
