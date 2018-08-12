const User = require('../../models/User.js');
const config = require('../../config/Config');
const Strategy = require('passport-twitter').Strategy;

module.exports = passport => {
  // twitter strategy
  passport.use(
    new Strategy(
      {
        consumerKey: config.TWITTER_APP_ID,
        consumerSecret: config.TWITTER_APP_SECRET,
        userProfileURL:
          'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
        callbackURL: '/login/twitter/return'
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
