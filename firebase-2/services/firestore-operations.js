const { Firestore } = require('@google-cloud/firestore');
const admin = require('./firebase-service');
const serviceAccount = require('../learning-eb209-firebase-adminsdk-eoml6-4bdf4656c9.json');
require('dotenv').config()

const projectId = serviceAccount.project_id;
const firestore = new Firestore({projectId});

module.exports = { firestore }

/*
documentation of Firestore for nodeJs service account:		https://googleapis.dev/nodejs/firestore/latest/CollectionReference.html
*/

/*	
 *	get reference of subCollection:

		let collectionRef = firestore.collection('col/doc/subcollection');
		console.log(`ID of the subcollection: ${collectionRef.id}`);

 *	if a collection is subcollection, then reference to parent document:

		let documentRef = collectionRef.parent;
		console.log(`Parent name: ${documentRef.path}`);

 *	path of the referenced collection (relative to the root of the database)

		console.log(`Path:	${collectionRef.path}`);
*/

/*
 *	select `user` collection, select `userId` document, then select subCollection `secrets` 
	add data `{secret: 'something'}` as document into the collection.

	let userRef = firestore.collection('user');
	let userId = 'userId'
	let secretRef = firestore.collection(`${userRef.path}/${userId}/secrets`);

	secretRef.add({secret: 'wanna be developer'}).then(docRef => {
		console.log(docRef.path);
	});

*/



/*
 *	create new user, with name `nik` and userId `userId2`

	firestore.collection('user').doc('userId2').set({name: 'nik'}).then(docRef => {
		console.log(docRef.path);
	});
*/

/*
	select document based on it's field/data
	firestore.collection('user').where('name', '==', 'nik').get().then(ss => {
		ss.forEach(doc => {
			doc.ref
		})
	});
*/


//  add new user
firestore.collection('users').doc('userId3').set({
 	name: 'sudi',
	email: 'sudi@hackerone.com',
}, {merge: true});


//  get data of user by its 'name'
//  firestore.collection('users').where('name', '==', 'sudi').get().then(ss => {
// 		ss.forEach(doc => {
// 			console.log(doc.id);
// 		})
//  });

//	add push value to array structured field
// firestore.collection('users').doc('userId3').update({
// 	secrets: admin.firestore.FieldValue.arrayUnion('football 💜')
// });

//	get user info by ID
firestore.collection('users').doc('userId3').get().then(ss => {
	console.log(ss.data().secrets);
})




//  push new secret
// firestore.collection(`users/userId3/secrets`).add({
// 	secret: 'I have my own s3cr3ts'
// });




/* i wont be using this subCollection structure to store `secrets`, instead will add array type field */

//	select document `userId3`
// firestore.doc('user/userId').get().then(documentSnapshot => {
// 	//	if it's exists, print it's data
// 	if (documentSnapshot.exists) {
// 		console.log(documentSnapshot.data());
// 	}
// 	//	get all subCollections of this document
// 	documentSnapshot.ref.listCollections().then(collections => {
// 		//	iterate over list of subcollections
// 		for (let collection of collections) {
// 		  console.log(`Found subcollection with id: ${collection.id}`);
// 			//	from subCollection id 'secrets'
// 			collection.get().then(docSnapshot => {
// 				//	iterate over list of doc in 'secrets' subcollection
// 			  	docSnapshot.forEach(doc => {
// 					console.log(doc.data());
// 				});
// 		  	});
// 		}
// 	});
// });