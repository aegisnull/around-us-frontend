const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /(http|https):\/\/(www\.)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/.test(
          v
        );
      },
    },
  },
  owner: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
