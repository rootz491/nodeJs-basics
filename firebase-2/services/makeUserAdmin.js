const admin = require('./firebase-service');

module.exports = (req, res) => {
    const { reqAdmin } = req.body;  //  this var contain boolean value on whether make current user admin or not i.e. true / false
    // console.log(req.authId, reqAdmin);
    
    //  set admin claim
    admin
        .auth()
        .setCustomUserClaims(req.authId, { admin: reqAdmin })       //  req.authId is currentUser.userId, is added at `checkIfAuthorized` middleware.
        .then(() => {
            res.json({'admin': reqAdmin});
        });
}