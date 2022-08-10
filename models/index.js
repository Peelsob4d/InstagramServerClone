const mongoose = require('mongoose');

const UserSchema = require('./user');

module.exports = {
  User: mongoose.model('User', UserSchema),
};
