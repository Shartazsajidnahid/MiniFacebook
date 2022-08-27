const express = require('express');
const router = express();

const ctrlPost = require('../controllers/postController');



router.post('/post', ctrlPost.postStatus);
router.get('/post', ctrlPost.getStatus);

// router.use('/story', imageHelper);
module.exports = router;
