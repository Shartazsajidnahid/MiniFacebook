const express = require('express');
const { isValidObjectId } = require('../db');
var router = express.Router();

var { Post } = require('../models/post');

router.get('/', (req, res) => {
    Post.find((err, doc) => {
        if (!err)
            res.send(doc);
        else
            console.log('Error in receiving customer: ' + JSON.stringify(err, undefined, 2));
    });
});



// router.get('/', (req, res) => {
    
//     try {
//         // userID = authController.loggedInUser.name;
//         const allStatus = await Post.find().sort({ "time": -1 });        // -1 means descending 
//         res.send(allStatus);
//     } catch (err) {
//         res.status(400).send({ Fail: 'Statuses not found' });
//     }
// });


router.post('/', (req, res) => {
    // console.log("post controller");
    var post = new Post({
        userid: req.body.userid,
        content: req.body.content
    });

    post.save((err, doc) => {
        if (!err) res.send(doc);
        else console.log('Error in post save: ' + JSON.stringify(err, undefined, 2));
    });
});



module.exports = router;