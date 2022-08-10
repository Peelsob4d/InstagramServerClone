const passport = require('passport');
const jwt = require('./strategies/jwtStrategy');
const local = require('./strategies/localStrategy');

module.exports = () => {
  passport.use('jwt', jwt);
  passport.use('local', local);
};
