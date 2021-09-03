const bcryptjs = require("bcryptjs");
const LocalStratergy = require("passport-local").Strategy;
const passport = require("passport");

const User = require("../models/auth");

module.exports = () => {
    //  controller for user login
    passport.use(new LocalStratergy(
        (email, password, done) => {
            User.findOne({ email })
                .then(user => {
                    //  if user not found
                    if (!user) done(null, false, { message: 'Incorrect Email' })
                    
                    bcryptjs.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        //  if passwords matched.
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect Password' });
                        }
                    });

                })
                .catch(err => console.log(err));
        }
    ));

    //  
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => done(null, user))
            .catch(_ => done(null, false, { message: 'unidentified user' }));
    });
}
