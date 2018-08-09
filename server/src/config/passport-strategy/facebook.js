const User = require('../models/User.js');
const config = require('./../config/Config');
const Strategy = require('passport-facebook').Strategy;

module.exports = passport => {
  // facebook strategy
  passport.use(
    new Strategy(
      {
        clientID: config.FACEBOOK_APP_ID,
        clientSecret: config.FACEBOOK_APP_SECRET,
        callbackURL: '/login/facebook/return',
        profileFields: ['id', 'displayName', 'email']
      },
      (accessToken, refreshToken, profile, cb) => {
        const email = profile.emails[0].value;
        User.getUserByEmail(email, (err, user) => {
          if (!user) {
            const newUser = new User({
              fullname: profile.displayName,
              email,
              facebookId: profile.id
            });
            User.createUser(newUser, error => {
              if (error) {
                // Handle error
              }
              return cb(null, user);
            });
          } else {
            return cb(null, user);
          }
          return true;
        });
      }
    )
  );
};
