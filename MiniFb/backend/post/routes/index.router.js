const express = require('express');
const router = express();

const ctrlUser = require('../controllers/userController');
const ctrlPost = require('../controllers/postController');

const jwtHelper = require('../config/jwtHelper');
const imageHelper = require('../controllers/storyController');

const multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })




router.get('/alluser', ctrlUser.getAlluser);



router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.authenticate, jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/post', ctrlPost.postStatus);
router.get('/post', ctrlPost.getStatus);
// router.post('/story', upload.single("image"), imageHelper.generateUUID, imageHelper.uploadImageIDmongoDB, imageHelper.uploadImage);
// router.get('/story', imageHelper.getUuidForUser);
// router.post('/story',imageHelper.getStatus);

// Add Story
router.post('/story', upload.single("files"), imageHelper.CreateStory);
//Get story
router.get('/story', imageHelper.getStory);

// router.use('/story', imageHelper);
module.exports = router;