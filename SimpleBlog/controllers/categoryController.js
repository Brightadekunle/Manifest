const models = require('../models')

const categoryCreatePost = (req, res, next) => {

    models.Category.create({
        name: req.body.name,
    })
        .then(category => {
            res.status(201).json({
                message: "Category created successfully",
                Category: category
            })
        })
        .catch(err => console.log(err))
}

const categoryUpdatePost = (req, res, next) => {
    models.Category.update({
        name: req.body.name,
    }, {
        where: {
            id: req.params.category_id
        }
    })
        .then(category => {
            // console.log(post)
            res.status(200).json({
                message: "category updated successfully",
                Category: category
            })
        })
        .catch(err => console.log(err))
}

const categoryDeletePost = (req, res, next) => {
    models.Category.destroy({
        where: {
            id: req.params.category_id
        }
    })
        .then(category => {
            // console.log(category)
            res.status(200).json({
                message: "Category deleted successfully",
                Category: category
            })
        })
        .catch(err => console.log(err))
}

const categoryDetailOneGet = (req, res, next) => {
    models.Category.findOne({
        where: {
            id: req.params.category_id
        }
    })
        .then(category => {
            // console.log(category)
            res.status(200).json({
                message: "These are the details of a single category.",
                categoryDetails: category
            })
        })
        .catch(err => console.log(err))
        

}


const categoryDetailAllGet = (req, res, next) => {

    models.Category.findAll()
        .then(categories => {

            console.log(categories)
            res.status(200).json({
                message: "This is the list of all categories",
                categories: categories
            })
        })
        .catch(err => console.log(err))
}


module.exports = {
    categoryCreatePost,
    categoryUpdatePost,
    categoryDetailOneGet,
    categoryDetailAllGet,
    categoryDeletePost,
}