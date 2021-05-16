let loginbtn = document.getElementById('login');
let currentUser = document.getElementById('user');
let logoutbtn = document.getElementById('logout');
let adminbtn = document.getElementById('admin');

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        loginbtn.hidden = true;
        currentUser.hidden = false;
        logoutbtn.hidden = false;
        adminbtn.hidden = false

        if (user.displayName != null)
            currentUser.innerText = user.displayName;


    } else {
      // User is signed out
      // ...

        loginbtn.hidden = false;
        currentUser.hidden = true;
        logoutbtn.hidden = true;
        adminbtn.hidden = true;

    }
});



logoutbtn.onclick = e => {
    e.preventDefault();



    firebase.auth().signOut().then(function() {
        window.location = `${window.location.origin}/auth/login`;
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}

