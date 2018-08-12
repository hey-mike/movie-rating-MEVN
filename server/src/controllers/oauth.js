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

  app.get(
    '/login/google',
    passport.authenticate('google', { scope: ['email'] })
  );

  app.get(
    '/login/google/return',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );
  app.get('/login/linkedin', passport.authenticate('linkedin'));

  app.get(
    '/login/linkedin/return',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );
};
