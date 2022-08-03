const express = require('express');
const router = express();

const ctrlUser = require('../controllers/userController');
const ctrlPost = require('../controllers/postController');

const jwtHelper = require('../config/jwtHelper');
const imageHelper = require('../controllers/storyController');

const multer = require('multer');

const PATH = './uploads';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
let upload = multer({
    storage: storage
});

router.get('/alluser', ctrlUser.getAlluser);



router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.authenticate, jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.post('/status', ctrlPost.postStatus);
router.get('/status', ctrlPost.getStatus);
router.post('/story', upload.single("image"), imageHelper.generateUUID, imageHelper.uploadImageIDmongoDB, imageHelper.uploadImage);
router.get('/story', imageHelper.getUuidForUser);
// router.post('/story',imageHelper.getStatus);


module.exports = router;