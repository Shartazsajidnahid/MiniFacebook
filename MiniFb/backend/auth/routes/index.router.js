const express = require('express');
const router = express();

const ctrlUser = require('../controllers/userController');

const jwtHelper = require('../config/jwtHelper');



router.get('/alluser', ctrlUser.getAlluser);



router.post('/auth/register', ctrlUser.register);
router.post('/auth/login', ctrlUser.authenticate, jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/auth/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

// router.use('/story', imageHelper);
module.exports = router;