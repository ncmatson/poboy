var path        = require('path');
var http        = require('http');
var bodyParser  = require('body-parser');
var express     = require('express');

var routes      = require('./routes');
var device      = require('./routes/device');

var pg          = require('pg');
var db          = require('./db.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', routes.index);
app.post('/add_device', device.add_device);
app.post('/update_device', device.update_device);

if (process.env.NODE_ENV == 'development'){
  process.env.PGDATABASE = 'poboy_db'
}
var pool = new pg.Pool();

db.init(pool)
app.set('connection', pool);

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('express server listening on port ' + app.get('port'));
});
