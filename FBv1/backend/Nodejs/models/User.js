const mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: {
        type: String,
        required: 'Name can\'t be empty'
    },
    userid: {
        type: String,
        required: 'User id can\'t be empty'
    },
    phone: {
        type: String,
        required: 'Phone no can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty'
    },
    password: {
        type: String,
        required: 'Name can\'t be empty'
    },
});

module.exports = {
    User: User
};