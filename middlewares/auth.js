'use strict'

const service = require('../services/service');

function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorización' });
    }

    const token = req.headers.authorization.split(' ')[1];

    service.decodeToken(token)
        .then(response => {
            req.user = response;
            next();
        })
        .catch(response => {
            req.status(response.status);
        });
}

module.exports = isAuth