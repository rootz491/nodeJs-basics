import { makeRequest } from '/static/js/baseFunctions.js'

document.addEventListener('submit', e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    //  make req to auth server
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then( _ => {

            makeRequest('/user/auth/login', 'post', () => {
                window.location = `${window.location.origin}/app`;
            });

        })
        .catch(err => {
            console.log(err);
            //  add err to DOM
            $('error').innerText = err.code;
        })

});


//  if user's already logged in, 
//      then redirect to home page

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        window.location = `${window.location.origin}/app`
    }
});



document.getElementById('googleAuth').addEventListener('click', e => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            window.location = `${window.location.origin}/app`
        });

});