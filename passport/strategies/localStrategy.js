const LocalStrategy = require('passport-local').Strategy;
const getHash = require('../../utils/hash_util');

const { User } = require('../../models');

const config = {
  usernameField: 'email',
  passwordField: 'password',
};

const local = new LocalStrategy(config, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user)
      return done(null, false, {
        success: false,
        message: '잘못된 이메일입니다',
      });
    if (user.password !== getHash(password))
      return done(null, false, {
        success: false,
        message: '잘못된 비밀번호입니다.',
      });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = local;
