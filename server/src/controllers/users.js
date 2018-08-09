const passport = require('passport');
const User = require('../models/User.js');

module.exports.controller = app => {
  // register a user
  app.post('/users/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
      name,
      email,
      password
    });
    User.createUser(newUser, (error, user) => {
      if (error) {
        res.status(422).json({
          message: 'Something went wrong. Please try again after some time!'
        });
      }
      res.send({ user });
    });
  });

  // login a user
  app.post(
    '/users/login',
    passport.authenticate('local', { failureRedirect: '/users/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );
};
