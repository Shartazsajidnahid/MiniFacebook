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


// router.post('/story', upload.single("files"),(req, res) => {
//     console.log("from story controller");

//     const minioClient = minio();

//     //PutObject(bucketName, objectName, stream, size, metaData[, callback])

//     var uuidName = crypto.randomUUID();
//     console.log(JSON.stringify(req.file))
//     minioClient.fPutObject('story', uuidName, req.file.path, function (err, objInfo) {

//         if (err) {
//             res.send(err);
//         }
//         else{
//             res.json("story done");
//         }
//     });

//     //  Create a new story
//      console.log(req.body.name);
    
//     //  const nstory = new story
//      const newStory = new story({
//         name: req.body.name,
//         storyUUID: uuidName
//     });

//     try {
//         const savedStory =  newStory.save();
//         // res.send({ story: 'Uploaded Successfully' });
//     } catch (err) {
//         // res.status(400).send(err);
//     }
// });


// Get story using minIO

module.exports.CreateStory = (async (req, res) => {
 console.log("from story controller");

    const minioClient = minio();


    minioClient.makeBucket('story', 'us-east-1', function(err) {
        if (err) return console.log('Error creating bucket.', err)
        console.log('Bucket created successfully in "us-east-1".')
    });


    //PutObject(bucketName, objectName, stream, size, metaData[, callback])

    var uuidName = crypto.randomUUID() + ".png";
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

exports.getStory = (async (req,res) =>{
    try{
        const allStory = await story.find();       // -1 means descending
        res.send(allStory);
    } catch(err){
        res.status(400).send({Fail: 'Image not found'});
    }
});


// router.get('/', (req, res) => {
//     story.find((err, doc) => {
//         if (!err)
//             res.send(doc);
//         else
//             console.log('Error in receiving customer: ' + JSON.stringify(err, undefined, 2));
//     });
// });




function minio() {
    return new Minio.Client({
        endPoint: 'storyobjectdb',
        port: 9000,
        useSSL: false,
        accessKey: 'minioadmin',
        secretKey: 'minioadmin'
    });
}

exports.getImage = ( (req,res) =>{
  
    try {
        let data;
         minioClient = minio();
         minioClient.getObject("story", req.params.id, (err, objStream) => {
           
            if(err) {
                return res.status(404).send({ message: "Image not found" });
            }
            objStream.on('data', (chunk) => {
                console.log("eta error 1?");
                data = !data ? new Buffer(chunk) : Buffer.concat([data, chunk]);

            });
            console.log(req.params.id);
       
            objStream.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.write(data);
                res.end();
            });
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error at fetching image" });
    }
});