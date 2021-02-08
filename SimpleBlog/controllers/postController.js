const models = require('../models')

const postCreatePost = (req, res, next) => {

    models.Post.create({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        AuthorId: req.body.authorId,
    })
        .then(post => {
            res.status(201).json({
                message: "Post created successfully",
                Post: post
            })
        })
        .catch(err => console.log(err))
}

const postUpdatePost = (req, res, next) => {
    models.Post.update({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        authorId: req.body.authorId,
    }, {
        where: {
            id: req.params.post_id
        }
    })
        .then(post => {
            // console.log(post)
            res.status(200).json({
                message: "Post updated successfully",
                post: post
            })
        })
        .catch(err => console.log(err))
}

const postDeletePost = (req, res, next) => {
    models.Post.destroy({
        where: {
            id: req.params.post_id
        }
    })
        .then(post => {
            console.log(post)
            res.status(200).json({
                message: "Post deleted successfully",
                post: post
            })
        })
        .catch(err => console.log(err))
}

const postDetailOneGet = (req, res, next) => {
    models.Post.findOne({
        where: {
            id: req.params.post_id
        }
    })
        .then(post => {
            // console.log(post)
            res.status(200).json({
                message: "These are the details of a single post.",
                PostDetails: post
            })
        })
        .catch(err => console.log(err))
        

}


const postDetailAllGet = (req, res, next) => {

    models.Post.findAll()
        .then(posts => {

            console.log(posts)
            res.status(200).json({
                message: "This is the list of all posts",
                posts: posts
            })
        })
        .catch(err => console.log(err))
}


module.exports = {
    postCreatePost,
    postUpdatePost,
    postDetailOneGet,
    postDetailAllGet,
    postDeletePost,
}