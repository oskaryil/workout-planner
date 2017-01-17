const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const GithubStrategy = require("passport-github").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const morgan = require('morgan'); // logger
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/devcafes');
const db = mongoose.connection;

const app = express();


const config = require('./config.json');
const viewdir = __dirname + '/views/';
const basedir = __dirname + '/public/';

const routes = require('./routes/index');

app.set('views', viewdir);
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // Support JSON Encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // Support encoded bodies 
app.use(cookieParser()); // Use cookieparser
app.use(express.static(basedir));

// Express Session
app.use(session({
  secret: 'keepclone',
  saveUninitialized: true,
  resave: true
}));

if(process.env.NODE_ENV = 'development') {
  app.use(morgan('dev'));
}

// Passport init
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      const namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use('/', routes);
// app.use('/admin', admin);
// app.use('/api', api);

app.set('port', (process.env.PORT || config.site.port));

app.listen(app.get('port'), function() {
  console.log(config.site.name + " running on port " + app.get('port'));
});



