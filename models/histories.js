const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historiesSchema = new Schema (
  {
    productId: {
      type: String,
      require: true,
    },

    productName: {
      type: String,
      require: true,
    },

    productBrand: {
      type: String,
      require: true,
    },

    price: {
      type: String,
      require: true,
    },

    quantity: {
      type: Number,
      require: true,
    },

    orderStatus: {
      type: String,
      require: true,
    },

    image: {
      type: Object,
      require: true,
    },

    userId: {
      type: String,
      require: true,
    },
  },

  { timestamps: true },
);

const Histories = mongoose.model("Histories", historiesSchema)
module.exports = Histories 