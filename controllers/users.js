const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../utils/error/notFound');
const BadRequest = require('../utils/error/badRequest');
const Conflict = require('../utils/error/Conflict');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secretkey', { expiresIn: '7d' });
      return res.send({
        token,
      });
    })
    .catch((err) => next(err));
};

module.exports.getUserByID = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .then((users) => {
      if (!users) {
        throw new NotFound('Пользователь с данным ID не найден');
      }
      return res.status(200).send(users.toObject());
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введены некорректные данные'));
      } if (err.code === 11000) {
        return next(new Conflict('Пользователь уже существует'));
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((users) => {
      if (!users) {
        throw new NotFound('Пользователь с данным ID не найден');
      }
      return res.status(200).send(users);
    })

    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введены некорректные данные'));
      }
      return next(err);
    });
};
