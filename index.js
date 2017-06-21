'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error al conectar al a BBDD: ${err}`)
    };
    console.log('Conexión a la BBDD establecida');

    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`);
    });
});