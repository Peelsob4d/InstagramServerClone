const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const passportUse = require('./passport');
const userRouter = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/instagram_clone');
passportUse();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/user', userRouter);

app.use((err, req, res, next) => {
  res.json(err);
});

app.listen(PORT, () => {
  console.log('서버가 실행중입니다.');
});
