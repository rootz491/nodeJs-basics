const admin = require('./firebase-service');

module.exports = async (req, res) => {
    const { userId } = req.body;        // userId is the firebase uid for the user
    
    await admin.auth().setCustomUserClaims(userId, {admin: true});

    return req.send({message: 'success'});
}