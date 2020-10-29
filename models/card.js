const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/[\w*-\?\.\/]*\/?$/i.test(v);
      },
      message: 'Вы ввели некорректный URL',
    },
  },
});

const cardSchema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    minlength: 2,
    maxlength: 100,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/[\w*-\?\.\/]*\/?$/i.test(v);
      },
      message: 'Вы ввели некорректный URL',
    },
  },
  owner: userSchema,
  likes: [
    {
      type: userSchema,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('card', cardSchema);
