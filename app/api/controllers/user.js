const mongoose = require('mongoose');
const User = require('../models/user');
const isValidUser = require('../validations/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/secret');

const filters = {
    username: (username) => {
        return { 'username': { $regex: new RegExp(username, 'i') } };
    }
};

exports.create = async (req, res) => {
    console.log(`POST [USER] - Creating user`)
    let validationUser = isValidUser(req.body, 'add');
    if (validationUser.status === 'success') {

        if (await User.findOne({ username: req.body.username })) {
            console.log(`POST [USER] - User already exists`);
            res.status(400).json({ error: 'User already exists' });
        } else {
            var hashedPassword = bcrypt.hashSync(req.body.password, 8);

            let user = new User({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hashedPassword
            });

            await user.save()
                .then(result => {
                    console.log(`POST [USER] - User created`);
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 60 * 60
                    });
                    res.status(201).json({ 
                        message: 'User created', 
                        result: result, 
                        token: token 
                    });
                })
                .catch(err => res.status(500).json({ error: err }));
        }
    } else {
        console.log(`POST [USER] - User not created Error: ${validationUser.error}`);
        res.status(400).json({ error: JSON.parse(validationUser.error) });
    }
};

exports.findUsers = (req, res) => {
    let { username, indexof, limit } = req.query; // eslint-disable-line no-unused-vars 

    if (username) {
        User.find(filters.username(username))
            .exec()
            .then(users => res.status(200).json(users))
            .catch(err => res.status(500).json({ error: err }));
    } else {
        User.find()
            .exec()
            .then(users => res.status(200).json(users))
            .catch(err => res.status(500).json({ error: err }));
    }
};

exports.findUserById = (req, res) => {
    User.findById({ _id: req.params.id })
        .exec()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err }));
};

exports.update = async (req, res) => {
    console.log(`PUT [USER] - Updating user ${req.body.username}`);
    let validationUser = isValidUser(req.body, 'update');
    if (validationUser.status === 'success') {
        let user = await User.findOne({ 
            username: req.body.username 
        }).select('+password');

        if (!user) {
            console.log(`PUT [USER] - User not found ${req.body.username}`);
            res.status(400).json({ error: 'User not found' });
        } else {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                var hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);

                const updateOps = {
                    'username': req.body.newUsername,
                    'password': hashedPassword,
                    '_id': req.params.id
                };

                await User.updateOne({ _id: req.params.id }, { $set: updateOps })
                    .then(update => { // eslint-disable-line no-unused-vars 
                        console.log(`PUT [USER] - User updated ${req.body}`);
                        var token = jwt.sign({ id: user._id }, config.secret, {
                            expiresIn: 60 * 60
                        });
                        res.status(202).json({ message: 'Updated', newToken: token });
                    })
                    .catch(err => res.status(500).json({ error: err }));
            }else{
                console.log(`PUT [USER] - Invalid credentials ${req.body}`);
                res.status(400).json({ error: 'invalid credentials' });
            }
        }
    } else {
        res.status(400).json({ error: JSON.parse(validationUser.error) });
    }
};

exports.delete = (req, res) => {
    console.log(`DELETE [USER] - Deleting user ${req.params.id}`);
    User.find({ _id: req.params.id })
        .remove()
        .exec()
        .then(res.status(202).json({ message: 'Deleted' }))
        .catch(err => res.status(500).json({ error: err }));
};