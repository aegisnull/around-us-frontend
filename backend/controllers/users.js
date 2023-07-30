const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (err) {
    res.status(500).send({ message: 'Algo salió mal' });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).orFail();
    res.send({ data: user });
  } catch (err) {
    res.status(404).send({
      message: 'Ningún usuario encontrado con ese id',
    });
  }
};

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

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }); // Find the user by email
    if (!user) {
      return res.status(401).send({ message: 'Usuario incorrectos' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Contraseña incorrectos' });
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });
    res.send({ token });
  } catch (err) {
    console.log(err);
    console.log('JWT_SECRET:', JWT_SECRET);
    res.status(500).send({ message: 'Algo salió mal' });
  }
};
