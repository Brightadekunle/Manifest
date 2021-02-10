const express = require('express')
const router = express.Router()


const postController = require('../controllers/postController')

router.get('/create', postController.postCreateGet)

router.post('/create', postController.postCreatePost)

router.get('/update/:post_id', postController.postUpdateGet)

router.post('/update/:post_id', postController.postUpdatePost)

router.post('/delete/:post_id', postController.postDeletePost)

router.get('/posts', postController.postDetailAllGet)

router.get('/:post_id', postController.postDetailOneGet)



module.exports = router

