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
      required : true,
      default : 1
    },
    image: {
      type: String,
      default : "empty.jpg"
    },
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("users", userSchema);
