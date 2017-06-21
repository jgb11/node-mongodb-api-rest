'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const productSchema = Schema({
    name: String,
    price: {
        type: Number,
        default: 0
    },
    picture: String,
    category: {
        type: String,
        enum: ['computers', 'phones', 'gadgets']
    },
    description: String
});

module.exports = mongoose.model('Product', productSchema);