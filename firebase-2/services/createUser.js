const admin = require('./firebase-service');

module.exports = async (req, res) => {
    const {
        email,
        password,
        passAgain,
        firstName,
        lastName,
        photoURL
    } = req.body;

    if (!(passAgain === password))
        return res.render('signup', { title: 'create new user', error: 'password mismatch 😶❌'});

    console.log('1');
    
    let re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if (email == '' || !re.test(email))
        return res.render('signup', { title: 'create new user', error: 'malformed email 📧 ❌'});

        console.log('2');
    
    re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/g;
    if (password == '' || !re.test(password))
        return res.render('signup', { title: 'create new user', error: 'weak password. It should be 6 to 16 characters, include atleast one number and special character 💪🏽'});

        console.log('3');

    re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (photoURL)
        if (photoURL == '' || !re.test(photoURL)) 
            return res.render('signup', { title: 'create new user', error: 'Photo URL is not valid 📷'});

    
    console.log('4');

    if (!(email && password && firstName && lastName)) {
        return res.render('signup', { title: 'create new user', error: 'please fill required fields (which suffix astrisk *) ✍️'});
    }

    console.log('validation successful');

    await admin.auth().createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: `${firstName} ${lastName}`,
        photoURL: photoURL,
        disabled: false,
    })
    .catch(err => {
        if(err.errorInfo) {
            console.log('error from firebase auth: ', err.errorInfo.message);
            return res.render('signup', { title: 'create new user', error: '⚠️ '+err.errorInfo.message});
        }
    });

    console.log('user created successfully');
    return res.render('login', { title: 'login', error: 'user created successfully. please login' });

}