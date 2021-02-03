const models = require('../models')

const createPost = (req, res, next) => {

    console.log(req.body)
    models.Teambright.create({
        name: req.body.name,
        UserId: req.params.user_id
    })
        .then(() => {
            console.log("Team bright member created successfully")
            res.redirect('/')
        })

}


const getUserTeamBrightDelete = (req, res, next) => {
    models.Teambright.destroy({
        where: {
            id: req.params.teambright_id,
        }
    })
        .then(() => {
            console.log("Team bright member deleted successfully")
            res.redirect('/')
        })
}


module.exports = {
    createPost,
    getUserTeamBrightDelete,

}