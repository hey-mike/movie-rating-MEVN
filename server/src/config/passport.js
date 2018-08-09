module.exports = function(passport) {
  // local strategy
  require('./passport-strategy/local')(passport);
  // jwt
  require('./passport-strategy/jwt')(passport);
};
