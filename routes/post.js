const { Router } = require('express');
const { User } = require('../models');
const multer = require('multer');
const passport = require('passport');
const uuid = require('uuid');

const router = Router();
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: function (req, file, cb) {
    let mimeType = '';
    switch (file.mimetype) {
      case 'image/jpeg':
        mimeType = 'jpg';
        break;
      case 'image/png':
        mimeType = 'png';
        break;
      case 'image/gif':
        mimeType = 'gif';
        break;
      default:
        mimeType = 'jpg';
        break;
    }
    cb(
      null,
      req.body.file + '_' + Date.now() + '_' + uuid.v4() + '.' + mimeType,
    );
  },
});

const upload = multer({ storage: storage });

router.use(passport.authenticate('jwt', { session: false }));

router.post('/post', upload.array('IMG_FILE'), async (req, res, next) => {
  const { location, content } = req.body;
  const author = await User.findOne(
    { id: req.user.id },
    { name: 1, banner: 1, _id: 1 },
  );
  const files = req.files;
  const post = {
    author,
    location,
    content,
    images: files.map((file) => {
      return (
        req.protocol + '://' + req.get('host') + '/images/' + file.filename
      );
    }),
  };
  await User.updateOne({ id: req.user.id }, { $push: { posts: post } });
  res.json({ message: 'success' });
});

router.get('/', async (req, res, next) => {
  const post = await User.findOne({ email: req.user.email }, { posts: 1 });
  res.json(post.posts);
});

module.exports = router;
