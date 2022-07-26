const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const router = express.Router();
const app=express();
require('./config/passportConfig');


const { mongoose } = require('./db.js');
const { minioClient } = require('./connectminio.js');
const passport = require('passport');


var employeeController = require('./controllers/userController.js');
var postController = require('./controllers/postController.js');
var storyController = require('./controllers/storyController.js');


app.use(bodyParser.json());
app.use(passport.initialize());
// app.use(cors({ origin: 'http://localhost:4200' }));.
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => console.log('Server started at port : 3000'));


app.use('/user', employeeController);
app.use('/post', postController);
app.use('/story', storyController);




module.exports = router;
