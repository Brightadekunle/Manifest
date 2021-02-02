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
        if (results.genre == null){
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
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id).exec(callback)
        },
        // authors_books: function(callback) {
        //   Book.find({ 'author': req.params.id }).exec(callback)
        // },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre==null) { // No results.
            res.redirect('/catalog/genres');
        }
        // Successful, so render.
        res.render('genre_delete', { title: 'Delete Genre', genre: results.genre, } );
    });
};

// Handle Genre delete on POST.
const genre_delete_post = function(req, res) {

    console.log(req.body.genreid)
    async.parallel({
        genre: function(callback) {
          Genre.findById(req.body.genreid).exec(callback)
        },
        
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
 
        // Author has no books. Delete object and redirect to the list of authors.
        Genre.findByIdAndRemove(req.body.genreid, function (err, deletedGenre) {
            if (err) { return next(err); }
            // Success - go to author list

            console.log("Genre deleted successfully")
            res.redirect('/catalog/genres')
        })
    });
};

// Display Genre update form on GET.
const genre_update_get = function(req, res) {
    // Get book, authors and genres for form.
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
                .exec(callback)
        },
        
        }, function(err, results) {
            if (err) { return next(err); }
            if (results.genre==null) { // No results.
                var err = new Error('Book not found');
                err.status = 404;
                return next(err);
            }
            
            res.render('genre_form', { title: 'Update Genre', genres: results.genre, genre: results.genre });
        });
};

// Handle Genre update on POST.
const genre_update_post = function(req, res) {

    // Validate and sanitise fields.
    body('name', 'Genre name required').trim().isLength({ min: 1 }).escape()

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped/trimmed data and old id.
    var genre = new Genre(
      { name: req.body.name,
        _id:req.params.id //This is required, or a new ID will be assigned!
       });

    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/error messages.

        // Get all authors and genres for form.
        async.parallel({
            genre: function(callback) {
                Genre.find(callback);
            },
        }, function(err, results) {
            if (err) { return next(err); }

            res.render('genre_form', { title: 'Update Genre', genre: results.genres });
        });
        return;
    }
    else {
        // Data from form is valid. Update the record.
        Genre.findByIdAndUpdate(req.params.id, genre, {}, function (err,thegenre) {
            if (err) { return next(err); }

               // Successful - redirect to book detail page.
               res.redirect(thegenre.url);
            });
    }
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