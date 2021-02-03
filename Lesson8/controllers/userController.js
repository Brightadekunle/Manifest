const models = require('../models')


const createPost = (req, res, next) => {
    const username = req.body.username

    // console.log(username)
    models.User.create({
        username: username
    })
        .then((user) => {
            // console.log(user)
            console.log("User created successfully..........")
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

const getUserDelete = (req, res, next) => {
    models.User.destroy({
        where: {
            id: req.params.user_id
        }
    })
        .then(() => {
            console.log("User deleted successfully.............")
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

const createTeamBrightPost = (req, res, next) => {

    // console.log(req.params)
    models.Teambright.create({
        name: req.body.name,
        UserId: req.params.user_id
    })
        .then(() => {
            console.log("Team bright member created successfully")
            res.redirect('/')
        })
        .catch(err => console.log(err))

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
        .catch(err => console.log(err))
}

const updateUserGet = (req, res, next) => {
    models.User.findOne({
        where: {
            id: req.params.user_id
        }
    })
        .then(user => {
            // console.log(user)
                res.render('update', {
                    title: "Update Page",
                    user: user,
                    teambright: null
            })  
            
        })
        .catch(err => console.log(err))
}

const updateUserPost = (req, res, next) => {

    models.User.update({
        username: req.body.username
    }, {
        where: {
            id: req.params.user_id
        }
    })
        .then((result) => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

const updateTeamBrightGet = (req, res, next) => {
    models.Teambright.findOne({
        where: {
            id: req.params.teambright_id
        }
    })
        .then(teambright => {
            console.log(teambright)
                res.render('update', {
                    title: "Update Teambright Page",
                    teambright: teambright,
                    user: null
            })  
            
        })
        .catch(err => console.log(err))
}

const updateTeamBrightPost = (req, res, next) => {

    models.Teambright.update({
        name: req.body.name
    }, {
        where: {
            id: req.params.teambright_id
        }
    })
        .then((result) => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

module.exports = {
    createPost,
    getUserDelete,
    createTeamBrightPost,
    getUserTeamBrightDelete,
    updateUserGet,
    updateUserPost,
    updateTeamBrightGet,
    updateTeamBrightPost,
}