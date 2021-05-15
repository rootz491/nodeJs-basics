const admin = require('./firebase-service');

module.exports = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName
    } = req.body;

    const user = await admin.auth().createUser({
        email,
        fullName: `${firstName} ${lastName}`,
        password
    })

    return req.send(user);
}