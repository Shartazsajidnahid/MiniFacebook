const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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


//methods

User.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

User.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

module.exports = {
    User: User
};