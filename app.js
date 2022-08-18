const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const passportUse = require('./passport');
const userRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const imageRouter = require('./routes/image');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/instagram_clone');
passportUse();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/auth', userRouter);
app.use('/posts', postRouter);
app.use('/images', imageRouter);

app.use((err, req, res, next) => {
  res.json(err);
});

app.listen(PORT, () => {
  console.log('서버가 실행중입니다.');
});
