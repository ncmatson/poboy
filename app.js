// app/index.js
const path        = require('path');
const http        = require('http');
const bodyParser  = require('body-parser');
const express     = require('express');
const routes      = require('./routes');

const pg = require('pg');


// const conString = 'postgres://cameronmatson@localhost/poboy_db'

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

console.log(process.env.NODE_ENV);
//app.use('/static', express.static(path.join(__dirname,'public')));

// app.configure('development', function() {
//   console.log('using dev settings');
// });
//
// app.configure('production', function() {
//   console.log('using prod settings');
// });
//https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x

function init() {
  app.get('/', routes.index);

  http.createServer(app).listen(app.get('port'), function() {
    console.log('express server listening on port ' + app.get('port'));
  });
}

init();

// app.use(express.static(path.join(__dirname, 'static')))
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
//
//
// app.use(function(err, req, res, next){
//   console.log('hmmm')
//   res.status(500).send('err')
// })
//
// app.post('/stuff', function(req, res, next){
//   var name=req.body.name;
//   var status=req.body.state;
//   console.log("name = "+name+", state is "+status);
//   res.end("yes");
//
//   pg.connect(conString, function (err, client, done) {
//     if (err) {
//       return next(err)
//     }
//     client.query('INSERT INTO devices VALUES (DEFAULT, $1, $2)', [name, status], function (err, result) {
//       done()
//
//       if (err) {
//         return next(err)
//       }
//     })
//   })
// })
//
// app.listen(3000, function(){
//   console.log('app listening on port 3000')
// })
