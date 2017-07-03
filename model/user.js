'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    name: String,
    password: {
        type: String,
        select: false
    },
    signupDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: Date
});

userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) {
        return nest();
    }
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next();
        }
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
                return next();
            }
            user.password = hash;
            return next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);