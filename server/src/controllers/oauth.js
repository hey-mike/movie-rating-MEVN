const passport = require('passport');

module.exports.controller = app => {
  app.get(
    '/login/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
  );

  app.get(
    '/login/facebook/return',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );
};
