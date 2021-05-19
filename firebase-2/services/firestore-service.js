const { Firestore } = require('@google-cloud/firestore');
const serviceAccount = require('../learning-eb209-firebase-adminsdk-eoml6-4bdf4656c9.json');
require('dotenv').config()

const projectId = serviceAccount.project_id;
const firestore = new Firestore({projectId});



module.exports = {

    registerUser: (userId, userName, email) => {
        //  send data to database upon creating new user.
        firestore.collection('users').doc(userId).set({
            name: userName,
            email
        }, {merge: true});
    },

    getUserData: (userId, callback) => {
        firestore.collection('users').doc(userId).get().then(ss => {
            callback(ss.data());
        })
    },

    pushSecret: (userId, secret) => {
        firestore.collection('users').doc(userId).update({
            secrets: admin.firestore.FieldValue.arrayUnion(secret)
        });
    },

    fetchSecret: (userId, callback) => {
        firestore.collection('users').doc(userId).get().then(ss => {
            callback(ss.data().secrets);
        })
    }


}


// testing functions
// let printData = data => console.log(data);
// fn.registerUser('userId4', 'adi', 'adi@gmail.com');
// fn.getDataByUsername('sudi', printData);
// fn.pushSecret('userId4', 'I\'m gonna be rich');
// fn.fetchSecret('userId4', printData);