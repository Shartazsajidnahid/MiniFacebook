const express = require('express');
const router = express();


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




// Add Story
router.post('/story', upload.single("files"), imageHelper.CreateStory);
//Get story
router.get('/story', imageHelper.getStory);
router.get('/story/:id', imageHelper.getImage);

// router.use('/story', imageHelper);
module.exports = router;