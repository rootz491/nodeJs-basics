var provider = new firebase.auth.GoogleAuthProvider();

let loginBtn = document.querySelector('#loginWithGoogle');

loginBtn.addEventListener('click', e => {
    e.preventDefault();

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;

            console.log(user, token);

            sendToken(user);

            // ...
        }).catch((error) => {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // The email of the user's account used.
            // var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            // var credential = error.credential;
            // ...
            console.log(error);
        });
});



let sendToken = user => {
    var id_token = googleUser.getAuthResponse().id_token
    fetch(`/user?token=${id_token}`);
}