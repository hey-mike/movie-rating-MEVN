module.exports = function(passport) {
  // local strategy
  require('./passport-strategy/local')(passport);
  // jwt
  require('./passport-strategy/jwt')(passport);
  // facebook
  require('./passport-strategy/facebook')(passport);
  // twitter
  require('./passport-strategy/twitter')(passport);
  // google
  require('./passport-strategy/google')(passport);
};
