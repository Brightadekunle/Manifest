const models = require('../models')

const authorCreatePost = (req, res, next) => {

    models.Author.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        username: req.body.username,
        email: req.body.email
    })
        .then(author => {
            res.status(201).json({
                message: "Author created successfully",
                Author: author
            })
        })
        .catch(err => console.log(err))
}

const authorUpdatePost = (req, res, next) => {
    models.Author.update({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        username: req.body.username,
        email: req.body.email
    }, {
        where: {
            id: req.params.author_id
        }
    })
        .then(author => {
            console.log(author)
            res.status(200).json({
                message: "Author updated successfully",
                author: author
            })
        })
        .catch(err => console.log(err))
}

const authorDeletePost = (req, res, next) => {
    models.Author.destroy({
        where: {
            id: req.params.author_id
        }
    })
        .then(author => {
            console.log(author)
            res.status(200).json({
                message: "Author deleted successfully",
                author: author
            })
        })
        .catch(err => console.log(err))
}

const authorDetailOneGet = (req, res, next) => {
    models.Author.findOne({
        where: {
            id: req.params.author_id
        }
    })
        .then(author => {
            console.log(author)
            res.status(200).json({
                message: "These are the details of a single author.",
                AuthorDetails: author
            })
        })
        .catch(err => console.log(err))
        

}


const authorDetailAllGet = (req, res, next) => {

    models.Author.findAll()
        .then(authors => {

            console.log(authors)
            res.status(200).json({
                message: "This is the list of all authors",
                authors: authors
            })
        })
        .catch(err => console.log(err))
}


module.exports = {
    authorCreatePost,
    authorUpdatePost,
    authorDetailOneGet,
    authorDetailAllGet,
    authorDeletePost,
}