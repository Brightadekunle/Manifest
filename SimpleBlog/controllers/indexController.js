const models = require('../models')

const indexGet = (req, res, next) => {

    models.Post.findAll({
        include: [models.Author]
    })
        .then(posts => {
            console.log(posts)
            res.render('home', { title: "Home Page", posts })
        })
        .catch(err => console.log(err))

    
}

const aboutGet = (req, res, next) => {
    res.render('about', { title: "About Page" })
}


module.exports = {
    indexGet,
    aboutGet,
}