const UserModel = require('../../models/User.js');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';

module.exports = function(passport) {
  passport.use(
    new JWTStrategy(jwtOptions, function(jwtPayload, cb) {
      //find the user in db if needed
      return UserModel.findById(jwtPayload.id, (error, user) => {
        if (error) return cb(err);
        return cb(null, user);
      });
    })
  );
};
