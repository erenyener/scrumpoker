var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejsLayout = require('ejs-layouts');
var mongoose = require('mongoose');

//Mongo Connection

var mongoDburi = 'mongodb://scrumpokerapp:PhP5Cpp23@ds243805.mlab.com:43805/scrumpokerdb';
mongoose.connect(mongoDburi);


//Routes
var index = require('./routes/index');
var sprints = require('./routes/sprints');
var issues = require('./routes/issues');
var votes = require('./routes/votes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(ejsLayout.express);


// uncomment after placing your favicon in /public
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/sprints', sprints);
app.use('/issues', issues);
app.use('/votes', votes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
