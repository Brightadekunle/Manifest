const express = require('express')
const router = express.Router()


const authorController = require('../controllers/authorController')

router.get('/create', authorController.authorCreateGet)

router.post('/create', authorController.authorCreatePost)

router.get('/login', authorController.authorSigninGet)

router.post('/login', authorController.authorSigninPost)

router.get('/logout', authorController.authorLogout)

router.post('/update/:author_id', authorController.authorUpdatePost)

router.delete('/delete/:author_id', authorController.authorDeletePost)

router.get('/authors', authorController.authorDetailAllGet)

router.get('/:author_id', authorController.authorDetailOneGet)



module.exports = router

