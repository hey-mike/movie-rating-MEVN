const UserModel = require('../../models/User.js');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      (email, password, done) => {
        UserModel.getUserByEmail(email, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          UserModel.comparePassword(
            password,
            user.password,
            (error, isMatch) => {
              if (isMatch) {
                return done(null, user);
              }
              return done(null, false);
            }
          );
          return true;
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
