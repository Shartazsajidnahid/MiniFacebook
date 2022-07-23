const express = require('express');
var router = express.Router();
const _ = require('lodash');
const Minio = require('minio');
const crypto = require('crypto');
const multer = require('multer');
const story = require('../models/story');




// router.post('/', (req, res) => {
//   console.log("story post controller");
// });


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


router.post('/story', upload.single("files"),(req, res) => {
    console.log("from story controller");

    const minioClient = minio();

    //PutObject(bucketName, objectName, stream, size, metaData[, callback])

    var uuidName = crypto.randomUUID();
    console.log(JSON.stringify(req.file))
    minioClient.fPutObject('story', uuidName, req.file.path, function (err, objInfo) {

        if (err) {
            res.send(err);
        }
        else{
            res.json("story done");
        }
    });

    //  Create a new story
     console.log(req.body.name);
    
    //  const nstory = new story
     const newStory = new story({
        name: req.body.name,
        storyUUID: uuidName
    });

    try {
        const savedStory =  newStory.save();
        // res.send({ story: 'Uploaded Successfully' });
    } catch (err) {
        // res.status(400).send(err);
    }
    
  
});




module.exports = router;

router.get('/', (req, res) => {
    story.find((err, doc) => {
        if (!err)
            res.send(doc);
        else
            console.log('Error in receiving customer: ' + JSON.stringify(err, undefined, 2));
    });
});

exports.getStory = (async (req,res) =>{
    try{
        const allStory =  story.find().sort({"time":-1}).limit(10);       // -1 means descending
        res.send(allStory);
    } catch(err){
        console.log("not found anything");
        res.status(400).send({Fail: 'Image not found'});
    }
});


function minio() {
    return new Minio.Client({
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        accessKey: 'minioadmin',
        secretKey: 'minioadmin'
    });
}