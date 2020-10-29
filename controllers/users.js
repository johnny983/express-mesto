const User = require('../models/user');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send('Не создано ни одного пользователя');
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send('Нет пользователя с таким id');
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    const _id = Math.random().toFixed(24).slice(2);
    const newUser = await User.create({ _id, ...req.body });
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getUsers, getUserById, createUser };
