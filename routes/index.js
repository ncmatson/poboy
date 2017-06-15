/*
 * GET home....
 */

exports.index = function(req, res) {
  res.render('index', {title : 'POBOY', env : process.env.RDS_HOSTNAME});
};
