const bcryptjs = require("bcryptjs");
const LocalStratergy = require("passport-local").Strategy;

const User = require("../models/auth");

module.exports = passport => {
    //  controller for user login
    passport.use(new LocalStratergy({ usernameField: 'email' },
        (email, password, done) => {
            console.log('login hit');
            User.findOne({ email })
                .then(user => {
                    //  if user not found
                    if (!user) {
                        console.log('user not found')
                        done(null, false, { message: 'Incorrect Email' })
                    } 
                    
                    bcryptjs.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        //  if passwords matched.
                        if (isMatch) {
                            console.log('login successful')
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect Password' });
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }
    ));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => done(null, user))
            .catch(_ => done(null, false, { message: 'unidentified user' }));
    });
}
