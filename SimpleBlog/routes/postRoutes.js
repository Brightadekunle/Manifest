const express = require('express')
const router = express.Router()


const postController = require('../controllers/postController')


router.post('/create', postController.postCreatePost)

router.post('/update/:post_id', postController.postUpdatePost)

router.delete('/delete/:post_id', postController.postDeletePost)

router.get('/posts', postController.postDetailAllGet)

router.get('/:post_id', postController.postDetailOneGet)



module.exports = router

