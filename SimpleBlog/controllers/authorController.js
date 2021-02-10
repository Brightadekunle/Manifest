const models = require('../models')
const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')
const path = require('path')

const authorCreateGet = (req, res, next) => {
    res.render('register', { title: "Author Create Page", success_msg: "", error_msg: "" })
}

const authorCreatePost = (req, res, next) => {
    const { firstname, lastname, email, username, password } = req.body
    const errors = []

    if (!email || !firstname || !lastname || !username || !password){
        errors.push({ msg: "Missing credentials" })
    }
    // if (password !== password2){
    //     // error for passwords do not match
    //     errors.push({ msg: "Passwords do not match" })
    // }
    if (password.length < 6){
        errors.push({ msg: "Password should be at least 6 characters!." })
    }

    if (errors.length > 0){
        console.log(errors)
        res.render("register", {
            title: "Author Create Page",
            errors: errors,
            firstname: firstname,
            lastname: lastname,
            username: username, 
            email: email,
            success_msg: "", 
            error_msg: "" 

        })
    } else {
        models.Author.findOne({
            where: {
                email: email
            }
        })
            .then(author => {
                if (author){
                    errors.push({ msg: "Email is already registered" })
                    res.render("register", {
                        title: "Author Create Page",
                        errors: errors,
                        firstname: firstname,
                        lastname: lastname,
                        username: username, 
                        email: email,
                        title: "Register",
                        success_msg: "", 
                        error_msg: "" 
                    }) 
                } else {
                    const hash = bcrypt.hashSync(password, bcrypt.genSalt(10, (err) => {
                        if (err){
                            console.log(err)
                            res.send(err)
                        }
                    }))
                    
                    models.Author.create({
                        first_name: firstname,
                        last_name: lastname,
                        username: username,
                        email: email,
                        password: hash
                    })
                        .then(author => {
                            // res.status(201).json({
                            //     message: "Author created successfully",
                            //     Author: author
                            // })
                            req.flash('success_message', "User created successfully")
                            res.redirect('/blog/author/login')
                        })
                        .catch(err => console.log(err))
    }
            })
    }
}

const authorSigninGet = (req, res, next) => {
    const success_msg = req.flash('success_message')
    const error_msg = req.flash('error_message')
    const errors = req.flash('error')
    res.render('login', { title: "Author Login Page", success_msg, error_msg, errors })
}

const authorSigninPost = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/blog',
        failureRedirect: '/blog/author/login',
        failureFlash: true,
        successFlash: true,
        session: true
    })(req, res, next)
}

const authorLogout = (req, res, next) => {
    // Logout Handle
    req.logOut()
    req.flash('success_message', 'You are logged out')
    res.redirect('/blog/author/login')
}

const authorUpdateGet = (req, res, next) => {
    models.Author.findByPk(req.params.author_id)
        .then(author => {
            res.render('authorupdate', { title: "Author Update Page", author: author })
        })
        .catch(err => console.log(err))
}

const authorUpdatePost = (req, res, next) => {

    let filename = ''

    if (!isEmpty(req.files)) {
        let file = req.files.profilePicture
        filename = file.name
        let uploadDir = path.join(path.dirname(require.main.filename), '/public/profiles/')
        file.mv(uploadDir+filename, (err) => {
            if (err) throw err
        })
    }
    let picture = "public/profiles/" + filename

    models.Author.update({
        username: req.body.username,
        email: req.body.email,
        profilePicture: picture
    }, {
        where: {
            id: req.params.author_id
        }
    })
        .then(author => {
            // console.log(author)
            // res.status(200).json({
            //     message: "Author updated successfully",
            //     author: author
            // })
            res.redirect(`/blog/author/${req.user.id}`)
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
        include: [models.Post],
        where: {
            id: req.params.author_id
        }
    })
        .then(author => {
            // console.log(author)
            // res.status(200).json({
            //     message: "These are the details of a single author.",
            //     AuthorDetails: author
            // })
            models.Post.findAll({
                include: [models.Author],
                where: {
                    AuthorId: author.id
                }
            })
                .then(posts => {
                    res.render('authordetail', { title: "Author Detail Page", author: author, posts })
                })
                .catch(err => console.log(err))
            
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
    authorCreateGet,
    authorCreatePost,
    authorUpdatePost,
    authorDetailOneGet,
    authorDetailAllGet,
    authorDeletePost,
    authorSigninGet,
    authorSigninPost,
    authorLogout,
    authorUpdateGet,
}