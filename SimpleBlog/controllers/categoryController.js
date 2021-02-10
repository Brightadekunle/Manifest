const models = require('../models')

const categoryCreateGet = (req, res, next) => {
    res.render('createcategory', { title: "Category Create Page" })
}

const categoryCreatePost = (req, res, next) => {

    models.Category.create({
        name: req.body.name,
    })
        .then(category => {
            // res.status(201).json({
            //     message: "Category created successfully",
            //     Category: category
            // })
            res.redirect('/blog/category/categories')
        })
        .catch(err => console.log(err))
}

const categoryUpdateGet = (req, res, next) => {
    models.Category.findByPk(req.params.category_id)
        .then(category => {
            res.render('updatecategory', { title: "Category Update Page", category: category })
        })
        .catch(err => console.log(err))
    
}


const categoryUpdatePost = (req, res, next) => {
    console.log(req.params)
    models.Category.update({
        name: req.body.name,
    }, {
        where: {
            id: req.params.category_id
        }
    })
        .then(category => {
            // console.log(post)
            // res.status(200).json({
            //     message: "category updated successfully",
            //     Category: category
            // })
            res.redirect('/blog/category/categories')
        })
        .catch(err => console.log(err))
}

const categoryDeletePost = (req, res, next) => {
    console.log(req.params.category_id)
    models.Category.destroy({
        where: {
            id: req.params.category_id
        }
    })
        .then(category => {
            // console.log(category)
            // res.status(200).json({
            //     message: "Category deleted successfully",
            //     Category: category
            // })
            res.redirect('/blog/category/categories')
        })
        .catch(err => console.log(err))
}

const categoryDetailOneGet = (req, res, next) => {
    models.Category.findByPk(req.params.category_id)
        .then(category => {
            models.PostCategory.findAll({
                include: [models.Post],
                where: {
                    CategoryId: category.id
                }
            })
                .then(posts => {
                    console.log(posts)
                    res.render('categorydetail', { title: "Category Detail Page", category, posts })
                })
        } )
        .catch(err => console.log(err))
}

// const categoryPostGet = (req, res, next) => {
//     models.PostCategory.findAll({
//         where: {
//             CategoryId: req.params.category_id
//         }
//     })
//         .then(posts => {
//             // console.log(category)
//             // res.status(200).json({
//             //     message: "These are the details of a single category.",
//             //     categoryDetails: category
//             // })
//             res.render('categorydetail', { title: "Category Detail Page", posts })
//         })
//         .catch(err => console.log(err))
        

// }


const categoryDetailAllGet = (req, res, next) => {

    models.Category.findAll()
        .then(categories => {
            // res.status(200).json({
            //     message: "This is the list of all categories",
            //     categories: categories
            // })
            res.render('categorylist', { title: "Category List", categories })
        })
        .catch(err => console.log(err))
}


module.exports = {
    categoryCreateGet,
    categoryCreatePost,
    categoryUpdatePost,
    categoryDetailOneGet,
    categoryDetailAllGet,
    categoryDeletePost,
    categoryUpdateGet,
}