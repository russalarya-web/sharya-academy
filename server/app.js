var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var db = require('./db/connect');

// import routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var adminRouter = require('./routes/adminDetails');
var detailsRouter = require('./routes/userDetails');
var sortRouter = require('./routes/sortOptions');
var contentRouter = require('./routes/content');
var quizRouter = require('./routes/quiz');
var classRouter = require('./routes/class');
var subjectRouter = require('./routes/subject');
var chapterRouter = require('./routes/chapter');

// set up app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// set up app elements
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);

// class router
app.use('/class', classRouter);

// subject router
app.use('/subject', subjectRouter);

// chapter router
app.use('/chapter', chapterRouter);

app.use('/details', detailsRouter);
app.use('/admin', adminRouter);
app.use('/sorting', sortRouter);
app.use('/content', contentRouter);
app.use('/quiz', quizRouter);

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
  res.render('error');
});

module.exports = app;
