const admin = require('firebase-admin');
const serviceAccount = require("../learning-eb209-firebase-adminsdk-eoml6-4bdf4656c9.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});



module.exports = admin;