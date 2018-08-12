const User = require('../../models/User');
const config = require('../../config/Config');
const Strategy = require('passport-linkedin').Strategy;

module.exports = passport => {
  // linkedin strategy
  passport.use(
    new Strategy(
      {
        consumerKey: config.LINKEDIN_APP_ID,
        consumerSecret: config.LINKEDIN_APP_SECRET,
        callbackURL: '/login/linkedin/return',
        profileFields: ['id', 'first-name', 'last-name', 'email-address']
      },
      (accessToken, refreshToken, profile, cb) => {
        const email = profile.emails[0].value;
        User.getUserByEmail(email, (err, user) => {
          if (!user) {
            const newUser = new User({
              fullname: profile.displayName,
              email: profile.emails[0].value,
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
