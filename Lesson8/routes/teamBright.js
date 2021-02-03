var express = require('express');
var router = express.Router();

const teamBrightController = require('../controllers/teamBright')

// router.post('/create', teamBrightController.createPost)

router.get('/:user_id/teambright/:teambright_id/delete', teamBrightController.getUserTeamBrightDelete)




module.exports = router