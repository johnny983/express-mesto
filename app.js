const express = require('express');
const mongoose = require('mongoose');

const app = express();

// const url = 'https://whywetrain';
// const urlRegExp = /^https?:\/\/[\w*-?.]*\/?$/i;

// console.log(urlRegExp.test(url));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const cardsRoutes = require('./routes/cards.js');
const usersRoutes = require('./routes/users.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5f9c257a56c53c9434ceb778',
  };
  next();
});

app.use('/cards', cardsRoutes);
app.use('/users', usersRoutes);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log('Все в порядке, машина исправна!');
});
