const { Schema, model } = require('mongoose');

const userSchema = new Schema({
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
        return /^https?:\/\/[\w*-?./]*\/?$/i.test(v);
      },
      message: 'Вы ввели некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    minlength: 7,
    unique: true,
  },
});

module.exports = model('user', userSchema);
