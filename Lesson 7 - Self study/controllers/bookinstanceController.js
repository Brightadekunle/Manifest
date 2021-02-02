var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');

const { body,validationResult } = require('express-validator');

const async = require('async')

// Display list of all BookInstances.
const bookinstance_list = function(req, res) {
    BookInstance.find()
        .populate('book')
        .then(function(list_bookinstances) {

            console.log(list_bookinstances)
            // Successful, so render
            res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
    })
        .catch(err => console.log(`Error - ${err}`));
};

// Display detail page for a specific BookInstance.
const bookinstance_detail = function(req, res) {
    
    
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec((err, bookinstance) => {
            if (err) { return next(err); }
            if (bookinstance==null) { // No results.
                var err = new Error('Book copy not found');
                err.status = 404;
                return next(err);
                }
            // Successful, so render.
            res.render('bookinstance_detail', { title: 'Copy: '+bookinstance.book.title, bookinstance:  bookinstance});
        })
};

// Display BookInstance create form on GET.
const bookinstance_create_get = function(req, res) {
    Book.find({},'title')
    .exec(function (err, books) {
      if (err) { return next(err); }
      // Successful, so render.
      res.render('bookinstance_form', {title: 'Create BookInstance', book_list: books});
    });
};

// Handle BookInstance create on POST.
const bookinstance_create_post = (req, res, next) => {

    // Validate and sanitise fields.
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate()

    

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        var bookinstance = new BookInstance(
          { book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Book.find({},'title')
                .exec(function (err, books) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books, selected_book: bookinstance.book._id , errors: errors.array(), bookinstance: bookinstance });
            });
            return;
        }
        else {
            // Data from form is valid.
            bookinstance.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(bookinstance.url);
                });
        }
};

// Display BookInstance delete form on GET.
const bookinstance_delete_get = function(req, res) {
    async.parallel({
        bookInstance: function(callback) {
            BookInstance.findById(req.params.id).exec(callback)
        },
        // authors_books: function(callback) {
        //   Book.find({ 'author': req.params.id }).exec(callback)
        // },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.bookInstance==null) { // No results.
            res.redirect('/catalog/bookinstances');
        }
        // Successful, so render.
        res.render('bookinstance_delete', { title: 'Delete BookInstance', bookInstance: results.bookInstance, } );
    });
};

// Handle BookInstance delete on POST.
const bookinstance_delete_post = function(req, res) {

    console.log(req.body)
    async.parallel({
        bookInstance: function(callback) {
          BookInstance.findById(req.body.bookInstanceid).exec(callback)
        },
        
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
 
        // Author has no books. Delete object and redirect to the list of authors.
        BookInstance.findByIdAndRemove(req.body.bookInstanceid, function (err, deletedBookInstance) {
            if (err) { return next(err); }
            // Success - go to author list

            console.log("Genre deleted successfully")
            res.redirect('/catalog/bookinstances')
        })
    });
};

// Display BookInstance update form on GET.
const bookinstance_update_get = function(req, res) {
    // Get book, authors and genres for form.

    async.parallel({
        book: function(callback) {
            Book.find().exec(callback);
        },
        bookInstance: function(callback) {
            BookInstance.findById(req.params.id)
                .exec(callback)
        },
        }, function(err, results) {
            console.log(results.book)
            if (err) { return next(err); }
            if (results.bookInstance == null) { // No results.
                var err = new Error('BookInstance not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            // Mark our selected genres as checked.
            // for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
            //     for (var book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
            //         if (results.genres[all_g_iter]._id.toString()===results.book.genre[book_g_iter]._id.toString()) {
            //             results.genres[all_g_iter].checked='true';
            //         }
            //     }
            // }
            res.render('bookinstance_form', { title: 'Update BookInstance', bookInstance: results.bookInstance, book_list: results.book });
        });
};

// Handle bookinstance update on POST.
const bookinstance_update_post = function(req, res) {
    
    // Validate and sanitise fields.
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate()

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Book object with escaped/trimmed data and old id.
    var bookInstance = new BookInstance(
      { book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back,
        _id:req.params.id //This is required, or a new ID will be assigned!
       });

    if (!errors.isEmpty()) {
      
    }
    else {
        // Data from form is valid. Update the record.
        BookInstance.findByIdAndUpdate(req.params.id, bookInstance, {}, function (err,thebookInstance) {
            if (err) { return next(err); }
               // Successful - redirect to book instance detail page.

               console.log("Book instance updated successfully")
               res.redirect(thebookInstance.url);
            });
    }
};

module.exports = {
    bookinstance_list,
    bookinstance_detail,
    bookinstance_create_get,
    bookinstance_create_post,
    bookinstance_delete_get,
    bookinstance_delete_post,
    bookinstance_update_get,
    bookinstance_update_post,
}