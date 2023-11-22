const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
},
    function (req, email, password, done) {
        
        User.findOne({ email: email })
            .then((user) => {
                if (!user || user.password != password) {
                    // req.flash('error','invalid username/password');
                    return done(null, false);
                }
                // req.flash('you are logged in');
                return done(null, user);
            })

            .catch((err) => {
                // req.flash('error', err);
                return done(err);
            })
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null,user.id);
});

// deserialize the user from the key in cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
    .then((user)=>{
        return done(null, user);
    })

    .catch((err)=>{
        console.log("Error in finding user ---> passport");
        return done(err);
    })
});


module.exports = passport;