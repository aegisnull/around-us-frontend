const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "La URL no es válida",
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "El email no es válido",
    },
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
