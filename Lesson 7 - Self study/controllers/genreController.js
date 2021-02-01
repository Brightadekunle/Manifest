var Genre = require('../models/genre');
const Book = require('../models/book')

var async = require('async');
const { body, validationResult } = require('express-validator')

// validator = require("express-validator");
// body = validator.body();
// validationResult = validator.validationResult();

// Display list of all Genre.
const genre_list = function(req, res, next) {
    Genre.find()
        .then((genre_list) => {
            res.render('genre_list', { title: 'Genre List', genre_list: genre_list })
        })
        .catch(err => {
            if (err){
                return next(err)
            }
            console.log(err)
        })
};

// Display detail page for a specific Genre.
const genre_detail = function(req, res) {
    async.parallel({
        genre: (callback) => {
            Genre.findById(req.params.id)
                .exec(callback)
        },
        genre_books: (callback) => {
            Book.find({ 'genre': req.params.id })
            .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err) }
        if (results.genre == "null"){
            var err = new Error("Genre Not Found")
            err.status = 404
            return next(err)
        }
        res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books } );
    })
};

// Display Genre create form on GET.
const genre_create_get = function(req, res) {
    res.render('genre_form', { title: 'Create Genre' });
};

// Handle Genre create on POST.
const genre_create_post = function(req, res, next) {

    body('name', 'Genre name required').trim().isLength({ min: 1 }).escape()

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    var genre = new Genre(
      { name: req.body.name }
    );

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array()});
      return;
    }
    else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      console.log(req.body.name)
      Genre.findOne({ name: req.body.name })
        .exec( function(err, found_genre) {
           if (err) { return next(err);
            console.log(err)
        }

           if (found_genre) {
             // Genre exists, redirect to its detail page.
             res.redirect(found_genre.url);
           }
           else {
             genre.save(function (err) {
               if (err) { return next(err); }
               // Genre saved. Redirect to genre detail page.

               res.redirect(genre.url);
             });

           }

         });
    }
  
};

// Display Genre delete form on GET.
const genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
const genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
const genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
const genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};

module.exports = {
    genre_list,
    genre_detail,
    genre_create_get,
    genre_create_post,
    genre_delete_get,
    genre_delete_post,
    genre_update_get,
    genre_update_post
}