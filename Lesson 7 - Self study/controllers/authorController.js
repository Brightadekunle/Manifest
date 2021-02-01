const Author = require('../models/author')
const Book = require('../models/book')

const { body,validationResult } = require('express-validator');
const async = require('async')

const author_list = function(req, res, next) {
    Author.find()
        .sort([['family_name', 'ascending']])
        .then((list_authors) => {
            //Successful, so render
            res.render('author_list', { title: 'Author List', author_list: list_authors });
        })
        .catch(err => {
            console.log(err)
            return next(err)
        })
};

// Display detail page for a specific Author.
const author_detail = function(req, res, next) {
    
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
                .exec(callback)
        },
        author_books: function(callback){
            Book.find({ 'author': req.params.id }, 'title summary')
                .exec(callback)
        }
    }, (err, results) => {
        if (err) { return next(err) }
        if (results.author == null){
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    })
};

// Display Author create form on GET.
const author_create_get = function(req, res, next) {
    res.render('author_form', { title: 'Create Author'});
};

// Handle Author create on POST.
const author_create_post = function(req, res, next) {
    
    // Validate and sanitise fields.
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate()

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
        return;
    }
    else {
        // Data from form is valid.

        // Create an Author object with escaped and trimmed data.
        var author = new Author(
            {
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });
        console.log(author)
        author.save(function (err) {
            if (err) { return next(err); }
            // Successful - redirect to new author record.
            res.redirect(`/catalog/author/${ author._id }`);
        });
    }
};

// Display Author delete form on GET.
const author_delete_get = function(req, res, next) {
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id).exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.params.id }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.author==null) { // No results.
            res.redirect('/catalog/authors');
        }
        // Successful, so render.
        res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
    });

};

// Handle Author delete on POST.
const author_delete_post = function(req, res) {
    async.parallel({
        author: function(callback) {
          Author.findById(req.body.authorid).exec(callback)
        },
        authors_books: function(callback) {
          Book.find({ 'author': req.body.authorid }).exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (results.authors_books.length > 0) {
            // Author has books. Render in same way as for GET route.
            res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books } );
            return;
        }
        else {
            // Author has no books. Delete object and redirect to the list of authors.
            Author.findByIdAndRemove(req.body.authorid, function deleteAuthor(err) {
                if (err) { return next(err); }
                // Success - go to author list
                res.redirect('/catalog/authors')
            })
        }
    });
};

// Display Author update form on GET.
const author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
const author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};


module.exports = {
    author_list,
    author_detail,
    author_create_get,
    author_create_post,
    author_delete_get,
    author_delete_get,
    author_delete_post,
    author_update_get,
    author_update_post

}