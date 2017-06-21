'use strict'

const Product = require('../model/product');

function getAllProducts(req, res) {
    console.log('GET /api/products');
    Product.find({}, (err, products) => {
        if (err) {
            return res.status(500).send({ errorMessage: `Error al recuperar productos de la base de datos: ${err}` })
        };
        if (!products) {
            return res.status(404).send({ errorMessage: 'No se han recuperado productos de la base de datos' })
        };
        res.status(200).send({ products });
    });
}

function getProduct(req, res) {
    console.log(`GET /api/products/${req.params.id}`);
    let productId = req.params.id;
    Product.findById(productId, (err, product) => {
        if (err) {
            return res.status(500).send({ errorMessage: `Error al recuperar producto ${req.params.id} de la base de datos: ${err}` })
        };
        if (!product) {
            return res.status(404).send({ errorMessage: 'El producto no existe' })
        };
        res.status(200).send({ product });
    });
}

function postProduct(req, res) {
    console.log('POST /api/products');
    console.log(req.body);

    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, savedProduct) => {
        if (err) {
            return res.status(500).send({ errorMessage: `Error al guardar en la base de datos: ${err}` })
        };
        res.status(201).send({ product: savedProduct });
    });
}

function putProduct(req, res) {
    console.log(`PUT /api/products/${req.params.id}`);
    console.log(req.body);

    let productId = req.params.id;
    let product = req.body;

    Product.findByIdAndUpdate(productId, product, { new: true }, (err, updatedProduct) => {
        if (err) {
            return res.status(500).send({ errorMessage: `Error al actualizar en la base de datos: ${err}` })
        };
        res.status(200).send({ product: updatedProduct });
    });
}

function deleteProduct(req, res) {
    console.log(`DELETE /api/products/${req.params.id}`);
    let productId = req.params.id;
    Product.findById(productId, (err, product) => {
        if (err || !product) {
            return res.status(500).send({ errorMessage: `Error borrar el producto ${req.params.id} de la base de datos: ${err}` })
        };
        product.remove((err) => {
            if (err) {
                return res.status(500).send({ errorMessage: `Error borrar el producto ${req.params.id} de la base de datos: ${err}` })
            };
            res.status(200).send({ message: "Producto eliminado correctamente" });
        });
    });
}

module.exports = {
    getProduct,
    getAllProducts,
    postProduct,
    putProduct,
    deleteProduct
}