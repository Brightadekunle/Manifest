const express = require('express')
const router = express.Router()


const categoryController = require('../controllers/categoryController')

router.get('/create', categoryController.categoryCreateGet)

router.post('/create', categoryController.categoryCreatePost)

router.get('/update/:category_id', categoryController.categoryUpdateGet)

router.post('/update/:category_id', categoryController.categoryUpdatePost)

router.get('/delete/:category_id', categoryController.categoryDeletePost)

router.get('/categories', categoryController.categoryDetailAllGet)

router.get('/:category_id', categoryController.categoryDetailOneGet)



module.exports = router

