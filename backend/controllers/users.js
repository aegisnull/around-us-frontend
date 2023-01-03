const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Algo salió mal' }));

module.exports.getUserById = (req, res) => User.findById(req.params.id)
  .orFail(() => {
    const error = new Error('Ningún usuario encontrado con ese id');
    error.statusCode = 404;
    throw error;
  })
  .then((user) => res.send({ data: user }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400);
    } else {
      res.status(500);
    }
    res.status(500).send({ message: 'Algo salió mal' });
  });

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    })
      .then((user) => {
        res.send({
          data: user,
        });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400);
        } else {
          res.status(500);
        }
        res.status(500).send({ message: 'Algo salió mal' });
      });
  });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  const opts = { runValidators: true, new: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.status(500).send({ message: 'Algo salió mal' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  const opts = { runValidators: true, new: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.status(500).send({ message: 'Algo salió mal' });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(() => {
      res.status(401).send({ message: 'Usuario o contraseña incorrectos' });
    })
    .catch(next);
};
