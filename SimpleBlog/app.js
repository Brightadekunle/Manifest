var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
const ejsLayout = require('express-ejs-layouts')
const models = require('./models')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(ejsLayout)

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/public', express.static(__dirname + "/public"))

const authorRoutes = require('./routes/authorRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

app.use('/author', authorRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)
app.use('/category', categoryRoutes)


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


// // Creating tables
// Table Category {
//     id int [pk, increment] // auto-increment
//     name varchar
//   }
  
//   Table Author {
//     id int [pk, increment] // auto-increment
//     first_name varchar
//     last_name varchar
//     email varchar
//     username varchar
//     create_date timestamp
//   }
  
//   Table Post {
//     id int [pk, increment] // auto-increment
//     post_title varchar
//     post_body varchar
//   }
  
//   Table Comment {
//     id int [pk, increment] // auto-increment
//     body varchar
//     postId int
//     authorId int
//   }
  
//   Table PostCategory {
//     categoryId int
//     postId int
//   }
  