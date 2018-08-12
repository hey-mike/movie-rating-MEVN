const User = require('../../models/User');
const config = require('../../config/Config');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = passport => {
  // google strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_APP_ID,
        clientSecret: config.GOOGLE_APP_SECRET,
        callbackURL: '/login/google/return'
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
