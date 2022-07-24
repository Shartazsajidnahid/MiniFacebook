const mongoose = require('mongoose');

var Post = mongoose.model('Post', {

    userid: {
        type: String,
        // required: 'User id can\'t be empty'
    },
    content: {
        type: String,
        required: 'Content no can\'t be empty'
    },
    time:{
        type: Date,
        default: Date.now,
        required: true
    }
});

module.exports = {
    Post: Post
};