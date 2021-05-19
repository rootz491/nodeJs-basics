const e = require('express');
const admin = require('../services/firebase-service');

module.exports = async (req, res, next) => {
        const { authToken } = req;
        await admin
            .auth()
            .verifyIdToken(authToken).then((claims) => {
                if (claims.admin === true) {
                    res.status(200);
                    return next();
                }
                else {
                    return res.status(403).send({'message': 'current user is not admin'});
                }
            });
};