const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersShema = new Schema(
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
      type: Number,
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
  },

  { timestamps: true }
);

const Products = mongoose.model("Users", usersShema);
module.exports = Products;
