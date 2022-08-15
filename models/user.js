const { Schema } = require('mongoose');

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  follows: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  posts: [
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      likes: {
        users: [
          {
            type: Schema.Types.ObjectId,
            ref: 'User',
          },
        ],
        count: {
          type: Number,
          default: 0,
        },
      },
      location: {
        type: String,
        required: true,
      },
      images: [
        {
          type: String,
        },
      ],
      content: {
        type: String,
        required: true,
      },
      comments: [
        {
          author: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = UserSchema;
