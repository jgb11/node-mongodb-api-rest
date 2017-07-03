'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const api = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use('/login', (req, res) => {
    res.render('login');
});
app.use('/products', (req, res) => {
    res.render('products');
});

app.use('/api/v1', api);


module.exports = app;