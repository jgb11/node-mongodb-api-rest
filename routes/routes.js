'use strict'

const express = require('express');
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

const api = express.Router();

api.get('/products', auth, productController.getAllProducts);
api.get('/products/:id', productController.getProduct);
api.post('/products', productController.postProduct);
api.put('/products/:id', productController.putProduct);
api.delete('/products/:id', productController.deleteProduct);

api.post('/user/signup', userController.signUp);
api.post('/user/signin', userController.signIn);

api.get('/private', auth, function(req, res) {
    return res.status(200).send({ message: `Usuario autenticado: ${req.user}`});
});

module.exports = api;