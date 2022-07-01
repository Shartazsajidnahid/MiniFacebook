const mongoose = require('mongoose');

var Post = mongoose.model('Post', {

    userid: {
        type: String,
        // required: 'User id can\'t be empty'
    },
    content: {
        type: String,
        required: 'Content no can\'t be empty'
    }
});

module.exports = {
    Post: Post
};