const path        = require('path');
const http        = require('http');
const bodyParser  = require('body-parser');
const express     = require('express');
const routes      = require('./routes');

var device = require('./routes/device');

const pg = require('pg');

var app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var pool = new pg.Pool({
  database: 'poboy_db'
});
// pool.connect();
app.get('/', routes.index);
app.post('/add_device', device.add_device);

var server = http.createServer(app);

pool.query('CREATE TABLE devices (' +
            'ID SERIAL PRIMARY KEY, ' +
            'NAME VARCHAR(40), ' +
            'STATUS BOOLEAN)',
            function (err) {
              if (err) {
                console.log(err.message);
                return;
              }
            });

pool.query('INSERT INTO devices VALUES (DEFAULT,\'turkey\',\'on\')', function(err) {
  if (err) {console.log(err.message);}
  console.log('inserted');
});

app.set('connection', pool);

server.listen(app.get('port'), function() {
  console.log('express server listening on port ' + app.get('port'));
});

// var config = {
//   user: process.env.RDS_USERNAME,
//   database: process.env.RDS_DB_NAME,
//   password: process.env.RDS_PASSWORD,
//   host: process.env.RDS_HOSTNAME,
//   port: process.env.RDS_PORT
// }

// if (process.env.NODE_ENV == 'production') {
//   console.log('in production')
//   var connection = pg.connect(config, function (err, client, done){
//     if (err){
//       console.log('connection oops');
//     }
//     app.set('connection', connection);
//     done();
//   });
// }
//
// else if (process.env.NODE_ENV == 'development') {
//   console.log('in development')
//   var connection = pg.connect('postgres://cameronmatson@localhost/poboy_db', function (err, client, done){
//     if (err){
//       console.log('connection oops');
//     }
//     app.set('connection', connection);
//     done();
//   });
// }
