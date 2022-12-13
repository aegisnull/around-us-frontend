const Card = require("../models/card");

module.exports.getCards = (req, res) =>
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Algo salió mal` }));

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id se volverá accesible
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.status(500).send({ message: `Algo salió mal` });
    });
};

module.exports.deleteCard = (req, res) =>
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error("Ninguna tarjeta encontrada con ese id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.status(500).send({ message: `Algo salió mal` });
    });

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Ninguna tarjeta encontrada con ese id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.status(500).send({ message: `Algo salió mal` });
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Ninguna tarjeta encontrada con ese id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.status(500).send({ message: `Algo salió mal` });
    });
