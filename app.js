var path        = require('path');
var http        = require('http');
var bodyParser  = require('body-parser');
var express     = require('express');
var flash       = require('express-flash');
var session     = require('express-session');
var passport    = require('passport');

var routes      = require('./routes');
var login       = require('./routes/login');
var device      = require('./routes/device');

var db          = require('./db.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false}));
app.use(flash());
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', routes.index);
app.get('/check_status/:device_name', device.check_status);
app.get('/login', login.loginPage);
app.post('/register', login.register);
app.post('/login', login.login);
app.post('/add_device', device.add_device);
app.post('/update_device', device.update_device);
app.post('/delete_device', device.delete_device);

if (process.env.NODE_ENV == 'development'){
  process.env.PGDATABASE = 'poboy_db'
}

db.init()
//app.set('connection', pool);

var server = http.createServer(app);

server.listen(app.get('port'), function() {
  console.log('express server listening on port ' + app.get('port'));
});
