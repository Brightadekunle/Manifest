var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const ejsLayout = require('express-ejs-layouts')
const session = require('cookie-session')
const flash = require('connect-flash')
const passport = require('passport')
const models = require('./models')
const initializePassport = require('./config/passport')


var app = express();

initializePassport(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(ejsLayout)

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/public', express.static(__dirname + "/public"))
// app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
      secureProxy: true,
      httpOnly: true,
      domain: 'cookie.com',
  }
}))

// git remote add origin https://github.com/Brightadekunle/Nodejs-Instagramclone.git
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated()
  res.locals.error = req.flash('error')
  next()
})

const authorRoutes = require('./routes/authorRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const indexRoutes = require('./routes/indexRoutes')


app.use('/blog', indexRoutes)
app.use('/blog/author', authorRoutes)
app.use('/blog/post', postRoutes)
app.use('/blog/comment', commentRoutes)
app.use('/blog/category', categoryRoutes)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


const PORT = process.env.PORT || 8080

models.sequelize.sync().then(() => {
  app.listen(PORT, console.log(`listening on PORT ${PORT}`))
})
