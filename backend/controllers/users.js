const User = require("../models/user");

module.exports.getUsers = (req, res) =>
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Algo salió mal` }));

module.exports.getUserById = (req, res) =>
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("Ningún usuario encontrado con ese id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.status(500).send({ message: `Algo salió mal` });
    });

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.status(500).send({ message: `Algo salió mal` });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  const opts = { runValidators: true, new: true };
  User.findByIdAndUpdate(req.user._id, { name, about }, opts)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.status(500).send({ message: `Algo salió mal` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  const opts = { runValidators: true, new: true };
  User.findByIdAndUpdate(req.user._id, { avatar }, opts)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.status(500).send({ message: `Algo salió mal` });
    });
};
