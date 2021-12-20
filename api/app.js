var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');

// Basic Details
var chapterRouter = require('./routes/chapterDetails');
var adminRouter = require('./routes/adminDetails');
var detailsRouter = require('./routes/userDetails');
var sortRouter = require('./routes/sortOptions');

var contentRouter = require('./routes/content');
var contentXIIRouter = require('./routes/content/xii');
var contentXIRouter = require('./routes/content/xi');
var contentXRouter = require('./routes/content/x');

var quizRouter = require('./routes/content/quizzes/quiz-1');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);

// Basic Details
app.use('/api/chapters', chapterRouter);
app.use('/api/details', detailsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/sorting', sortRouter);
app.use('/api/content', contentRouter);
app.use('/api/content/xii', contentXIIRouter);
app.use('/api/content/xi', contentXIRouter);
app.use('/api/content/x', contentXRouter);

app.use('/api/quiz/quiz-1', quizRouter);

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
