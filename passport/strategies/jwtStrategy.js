const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../../models');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY || 'secret',
  algorithms: ['HS256'],
};

const jwt = new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await User.findOne({ id: payload.id });
    if (user) return done(null, user);
    else return done(null, false, { success: false, message: 'Token error' });
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

module.exports = jwt;
