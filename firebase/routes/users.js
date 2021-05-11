const { query } = require('express');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/user', function(req, res) {
  if(req.query.token) {
    let id_token = req.query.token;
    // Build Firebase credential with the Google ID token.
    var credential = firebase.auth.GoogleAuthProvider.credential(id_token);

    // Sign in with credential from the Google user.
    let user = firebase.auth().signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(error);
    });
    res.render('index', { title: 'authenticated' });
  }
  else
    res.render('login');
});

module.exports = router;
