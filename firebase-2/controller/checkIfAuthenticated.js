const admin = require('../services/firebase-service');

//  check if request is valid by looking into 'authorization' header, if there's 'token' then extract it!
const getAuthToken = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        req.authToken = req.headers.authorization.split(' ')[1];
    else
        res.status(403);
    next();
}

//  after fetching token, verify the token
module.exports = (req, res, next) => {
    getAuthToken(req, res, async () => {
        try {
            const{ authToken } = req;
            const userInfo = await admin.auth().verifyIdToken(authToken);
            req.authId = userInfo.uid;
            next();
        }
        catch (e) {
            return res.status(401);
        }
    })
}