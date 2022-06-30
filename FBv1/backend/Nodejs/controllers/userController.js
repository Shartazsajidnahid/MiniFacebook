const express = require('express');
const { isValidObjectId } = require('../db');
var router = express.Router();

var { User } = require('../models/User');

router.get('/', (req, res) => {
    User.find((err, doc) => {
        if (!err)
            res.send(doc);
        else
            console.log('Error in receiving customer: ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id))
        return res.status(400).send('No record with such id: ' + req.params.id);

    User.findById(req.params.id, (err, doc) => {
        if (!err)
            res.send(doc);
        else
            console.log('Error in retriving customer by id:' + JSON.stringify(err, undefined, 2));
    });
});

router.put('/', (req, res) => {
    var customer = new User({
        userid: req.body.userid,
        password: req.body.password
    });

    User.findOne({ userid: customer.userid }, (err, user) => {
        if (!err) {
            if (user) {
                if (user.password == customer.password)
                    res.send(user);
                else
                    return res.status(400).send('Wrong password');
            } else
                return res.status(400).send('User not registerd');
        } else
            console.log('Error in fetching data: ' + JSON.stringify(err, undefined, 2));
    });
});

router.post('/', (req, res) => {
    var customer = new User({
        name: req.body.name,
        userid: req.body.userid,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    });

    User.countDocuments({ email: customer.email }, (err, cnt) => {
        if (cnt > 0)
            console.log('Account already exists with the email: ' + customer.email);
        else {
            customer.save((err, doc) => {
                if (!err) res.send(doc);
                else console.log('Error in customer save: ' + JSON.stringify(err, undefined, 2));
            });
        }
    });
});


module.exports = router;