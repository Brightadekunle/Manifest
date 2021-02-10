const express = require('express')
const router = express.Router()


const commentController = require('../controllers/commentController')


router.post('/create/post/:postId', commentController.commentCreatePost)

router.post('/update/:comment_id', commentController.commentUpdatePost)

router.delete('/delete/:comment_id', commentController.commentDeletePost)

router.get('/comments', commentController.commentDetailAllGet)

router.get('/:comment_id', commentController.commentDetailOneGet)



module.exports = router