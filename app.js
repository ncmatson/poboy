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

function init() {
  app.get('/', routes.index);

  http.createServer(app).listen(app.get('port'), function() {
    console.log('express server listening on port ' + app.get('port'));
  });
}

if (process.env.NODE_ENV == 'production') {
  console.log('in production')
  var config = {
    user: process.env.RDS_USERNAME, //env var: PGUSER
    database: process.env.RDS_DB_NAME, //env var: PGDATABASE
    password: process.env.RDS_PASSWORD, //env var: PGPASSWORD
    host: proccess.env.RDS_HOSTNAME, // Server hosting the postgres database
    port: process.env.RDS_PORT, //env var: PGPORT

  }
  var connection = pg.connect(config, function (err, client, done){
    if (err){
      console.log('connection oops');
    }
    client.query('select \'turkey\'', function(err, result) {
      if (err) {
        console.log('query oops');
      }
      console.log(result);
      done();
    });
  });
  app.set('connection', connection);
}
else if (process.env.NODE_ENV == 'development') {
  console.log('in development')
  var connection = pg.connect('postgres://cameronmatson@localhost/poboy_db', function (err, client, done){
    if (err){
      console.log('connection oops');
    }
    client.query('select \'turkey\'', function(err, result) {
      if (err) {
        console.log('query oops');
      }
      console.log(result);)
      done();
    });
  });
  app.set('connection', connection);
}


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
