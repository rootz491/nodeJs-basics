

document.addEventListener('submit', e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    //  make req to auth server
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then( _ => {
       
        //  it will get IdToken, 
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            //  attach to header, and send req to backend.
            axios.post(window.location.href, {}, {
                headers: { 'Authorization': `Bearer ${idToken}` } 
            })  
                .then(res => res.data)
                .then(data => {
                    if (data.login === true) {
                        // window.location.replace( window.location.origin + '/app' );
                        //  redirect to index
                        alert('login successful');
                    }
                    else {
                        e.target.email.value = null;
                        e.target.password.value = null;
                        alert('please try again');
                    }
                })
                .catch(err => console.log(err));
        })
        .catch((error) => {
            //  error
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });

    });

});
