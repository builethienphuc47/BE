const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthsShema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    emaill: {
      type: String,
      require: false,
    },
    address: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
    },
  },

  { timestamps: true }
);

const Auths = mongoose.model("Auths", AuthsShema);
module.exports = Auths;
