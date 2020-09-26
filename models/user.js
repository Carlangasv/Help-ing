const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    range: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("users", userSchema);