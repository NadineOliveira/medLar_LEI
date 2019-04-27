var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var uuid = require('uuid/v4')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var passport = require('passport')
require('./authentic/aut');

var app = express();

//Passport Autentication
app.use(session({
  genid: req => {
    return uuid()},
  store: new FileStore(),
  secret: 'MedLar_secret',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Handler
var indexRouter = require('./routes/index');
var apiAuxiliaresRouter = require('./routes/api/auxiliares');
var apiMedicamentosRouter = require('./routes/api/medicamentos');
var apiHorariosRouter = require('./routes/api/horarios');
var apiUtentesRouter = require('./routes/api/utentes');

app.use('/', indexRouter);
app.use('/api/auxiliares', apiAuxiliaresRouter);
app.use('/api/medicamentos', apiMedicamentosRouter);
app.use('/api/horarios', apiHorariosRouter);
app.use('/api/utentes',apiUtentesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
}).listen(3000);

module.exports = app;
