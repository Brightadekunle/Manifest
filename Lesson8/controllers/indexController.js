const models = require('../models')
// const Teambright = require('../models/teambright')

const indexGet = (req, res, next) => {
    models.User.findAll({
        include: [models.Teambright],
    })
        .then((users) => {
            // console.log(users)
            res.render('index', {
                title: "HomePage",
                users: users
            })  
        })
}

module.exports = {
    indexGet,
}