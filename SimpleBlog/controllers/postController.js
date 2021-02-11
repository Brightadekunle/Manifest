const models = require('../models')

const postCreateGet = async (req, res, next) => {
    // console.log(req.user.id)
    const categories = await models.Category.findAll()
    res.render('createpost', { title: "Create Post", categories })
}

const postCreatePost = (req, res, next) => {

    let postCat = req.body.categories
    console.log(typeof postCat)
    models.Post.create({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
        AuthorId: req.user.id,
    })
        .then(post => {
            // res.status(201).json({
            //     message: "Post created successfully",
            //     Post: post
            // })
            if (postCat.length == 1){
                models.PostCategory.create({
                    PostId: parseInt(post.id),
                    CategoryId: parseInt(postCat)
                })
                    .then(() => {
                        res.redirect('/blog')
                    })
            } else {
                for (var id of postCat){
                    // console.log(id)
                    models.PostCategory.create({
                        PostId: post.id,
                        CategoryId: id
                    })
                        .then(postCaregories => {
                            // console.log(postCaregories)
                            res.redirect('/blog')
                        })
                        .catch(err => console.log(err))
                }
            }
            
        })
        .catch(err => console.log(err))
}

const postUpdateGet = async (req, res, next) => {

    const categories = await models.Category.findAll()
    models.Post.findByPk(req.params.post_id)
        .then(post => {
            res.render('postupdate', { title: "Update Post Page", post: post, categories: categories })
        })
        .catch(err => console.log(err))
}

const postUpdatePost = async (req, res, next) => {

    const post = await models.Post.findByPk(req.params.post_id)
    models.Post.update({
        post_title: req.body.post_title,
        post_body: req.body.post_body,
    }, {
        where: {
            id: req.params.post_id
        }
    })
        .then(update => {
            // console.log(post)
            // res.status(200).json({
            //     message: "Post updated successfully",
            //     post: post
            // })
            res.redirect(`/blog/post/${post.id}`)
        })
        .catch(err => console.log(err))
}

const postDeletePost = (req, res, next) => {
    console.log(req.params.post_id)
    models.Post.destroy({
        where: {
            id: req.params.post_id
        }
    })
        .then(post => {
            // console.log(post)
            // res.status(200).json({
            //     message: "Post deleted successfully",
            //     post: post
            // })
            res.redirect('/blog')
        })
        .catch(err => console.log(err))
}

const postDetailOneGet = (req, res, next) => {
    models.Post.findByPk(req.params.post_id, {
        include: [models.Author, models.Comment]
    })
        .then(post => {
            // console.log(post)
            // res.status(200).json({
            //     message: "These are the details of a single post.",
            //     PostDetails: post
            // })
            models.Comment.findAll({
                include: [models.Author]
            })
                .then((comments) => {
                    // console.log(comments)
                    res.render('post', { title: "Post Page", post: post, comments })
                })
                .catch(err => console.log(err))
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
    postCreateGet,
    postCreatePost,
    postUpdatePost,
    postDetailOneGet,
    postDetailAllGet,
    postDeletePost,
    postUpdateGet,
}