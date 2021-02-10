const models = require('../models')
const bcrypt = require('bcrypt-nodejs')
const passport = require('passport')

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
        failureRedirect: '/blog/auhor/login',
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
    authorCreateGet,
    authorCreatePost,
    authorUpdatePost,
    authorDetailOneGet,
    authorDetailAllGet,
    authorDeletePost,
    authorSigninGet,
    authorSigninPost,
    authorLogout,
}