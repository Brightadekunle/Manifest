var express = require('express');
var router = express.Router();


const userController = require('../controllers/userController')

router.post('/create', userController.createPost)

router.post('/:user_id/teambright/create', userController.createTeamBrightPost)

router.get('/:user_id/delete', userController.getUserDelete)

router.get('/:user_id/teambright/:teambright_id/delete', userController.getUserTeamBrightDelete)

router.get('/:user_id/update', userController.updateUserGet)

router.post('/:user_id/update', userController.updateUserPost)

router.get('/teambright/:teambright_id/update', userController.updateTeamBrightGet)

router.post('/teambright/:teambright_id/update', userController.updateTeamBrightPost)



module.exports = router