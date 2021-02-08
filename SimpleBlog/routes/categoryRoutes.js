const express = require('express')
const router = express.Router()


const categoryController = require('../controllers/categoryController')


router.post('/create', categoryController.categoryCreatePost)

router.post('/update/:category_id', categoryController.categoryUpdatePost)

router.delete('/delete/:category_id', categoryController.categoryDeletePost)

router.get('/categories', categoryController.categoryDetailAllGet)

router.get('/:category_id', categoryController.categoryDetailOneGet)



module.exports = router

