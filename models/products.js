const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productsShema = new Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    productBrand: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    info: {
      type: String,
      require: false,
    },
    price: {
      type: Number,
      require: true,
    },
    discount: {
      type: Number,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    image: {
      type: Object,
      require: true,
    },
  },

  { timestamps: true }
);

const Products = mongoose.model("Products", productsShema);
module.exports = Products;
