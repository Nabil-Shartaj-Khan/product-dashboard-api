const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator"); //to validate email
const { validate } = require("./product");

const userModel = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("Invalid email structure!");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("users", userModel);
