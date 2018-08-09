const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      (email, password, done) => {
        User.getUserByEmail(email, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          User.comparePassword(password, user.password, (error, isMatch) => {
            if (isMatch) {
              return done(null, user);
            }
            return done(null, false);
          });
          return true;
        });
      }
    )
  );
};
