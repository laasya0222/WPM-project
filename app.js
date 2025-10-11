var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./app_server/models/db');
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var battleRouter = require('./app_server/routes/battle');
var closetRouter = require('./app_server/routes/closet');
var statsRouter = require('./app_server/routes/stats');
var profileRouter = require('./app_server/routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/battle', battleRouter);
app.use('/closet', closetRouter);
app.use('/stats', statsRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('ERROR:', err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.title = 'Error'; // Always provide a title for error view

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
