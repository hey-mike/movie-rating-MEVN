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

  app.get(
    '/login/twitter',
    passport.authenticate('twitter', { scope: ['email'] })
  );

  app.get(
    '/login/twitter/return',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );
};
