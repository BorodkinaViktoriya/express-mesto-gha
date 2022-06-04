const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      res.status(500).send({
        message:
          'На сервере произошла ошибка',
      });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message:
            'Пользователь по указанному _id не найден.',
        });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({
          message:
            'Пользователь по указанному _id не найден.',
        });
      }
      return res.status(500).send({
        message:
          'На сервере произошла ошибка',
      });
    });
};

const createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  const isEmail = validator.isEmail(email);
  if (!isEmail || !password) {
    return res.status(400).send({ message: ' Переданы некорректные данные при создании пользователя. ' });
  }
  return bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: ' Переданы некорректные данные при создании пользователя. ' });
      }
      return res.status(500).send({
        message:
          'На сервере произошла ошибка',
      });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'big-secret-key', { expiresIn: '7d' });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === 'not_found') {
        return res.status(400).send({ message: 'Емейл или пароль неверный' });
      }

      return res.status(500).send({ message: 'Что-то сломалось' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
