'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', api);


module.exports = app;