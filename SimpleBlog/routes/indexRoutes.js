const express = require('express')
const router = express.Router()

const indexController = require('../controllers/indexController')

router.get('/', indexController.indexGet)

router.get('/about', indexController.aboutGet)

module.exports = router
