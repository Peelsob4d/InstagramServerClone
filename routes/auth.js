const { Router } = require('express');
const passport = require('passport');
const { User } = require('../models');

const getHash = require('../utils/hash_util');
const setUserToken = require('../utils/jwt');

const router = Router();

router.post('/register', async (req, res, next) => {
  const { email, password, nickname, name } = req.body;
  console.log(req.body);
  if (!email || !password || !name || !nickname) {
    res.json({ success: false, message: 'body error' });
    return;
  }
  const hashPw = getHash(password);

  const exist = await User.findOne({ email });

  if (exist) {
    res.json({ success: false, message: 'Id already exists' });
    return;
  }

  const user = await User.create({
    email,
    name,
    nickname,
    password: hashPw,
  });
  res.json(user);
});

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res, next) => {
    const token = setUserToken(req.user);
    res.json(token);
  },
);

router.post(
  '/auth',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (err) {
      next(err);
    }
  },
);
//JWT 인증 테스트 코드

module.exports = router;
