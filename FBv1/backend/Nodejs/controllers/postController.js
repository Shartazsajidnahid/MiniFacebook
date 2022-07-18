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

// router.get('/:id', (req, res) => {
//     if (!isValidObjectId(req.params.id))
//         return res.status(400).send('No record with such id: ' + req.params.id);

//     Post.findById(req.params.id, (err, doc) => {
//         if (!err)
//             res.send(doc);
//         else
//             console.log('Error in retriving customer by id:' + JSON.stringify(err, undefined, 2));
//     });
// });



router.post('/', (req, res) => {
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