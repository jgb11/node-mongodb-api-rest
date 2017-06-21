'use strict'

const express = require('express');
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');

const api = express.Router();

api.get('/products', productController.getAllProducts);
api.get('/products/:id', productController.getProduct);
api.post('/products', productController.postProduct);
api.put('/products/:id', productController.putProduct);
api.delete('/products/:id', productController.deleteProduct);

api.get('/private', auth, function(req, res) {
    return res.status(200).send({ message: `Usuario autenticado: ${req.user}`});
});

module.exports = api;