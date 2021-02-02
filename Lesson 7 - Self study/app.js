const express = require('express')
// const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const ejsLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')



const app = express();

const mongoDB = "mongodb+srv://Bright:adekunle3333@cluster0.lroeh.gcp.mongodb.net/locallibrary?retryWrites=true&w=majority"
// var mongoDB = 'mongodb://127.0.0.1:27017/locallibrary';
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Database connected..."))
    .catch(err => console.log(`MongoDB Error - ${err}`))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/public', express.static(__dirname + "/public"))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog')  //Import routes for "catalog" area of site

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

console.log("Yeah........")

// Error - handler
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
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});