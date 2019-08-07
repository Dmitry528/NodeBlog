var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var registerRouter = require('./routes/register');
var signIn = require('./routes/signIn');

var app = express();
//app.use(expressValidator());
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// simple lock rout
  const auth = (req, res, next) => {
    console.log(req.cookies);
    let cookie = req.cookies;
    if(cookie.Auth === 'true'){
      console.log('next');
      next();
    } 
    else{
      res.redirect('http://localhost:3000/Register');
    }
  }
//

app.use('/', indexRouter);
app.use('/blog', auth ,blogRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/SignIn', signIn);

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

mongoose.connect('mongodb+srv://admin5:7mbUDDdsqM7h3Vb@cluster0-q5xnz.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() => {
  console.log('Connected to DB')
})
.catch((err) => console.log(err));


module.exports = app;
