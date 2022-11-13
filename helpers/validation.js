const Joi = require("joi");

const addProductSchema = Joi.object({
  productName: Joi.string().min(5).max(100).required(),
  productBrand: Joi.string().max(100).required(),
  type: Joi.string().max(100).required(),
  info: Joi.string().alphanum(),
  price: Joi.number().required(),
  discount: Joi.number(),
  quantity: Joi.number().required(),
  images: Joi.array().items(Joi.string().required()),
});


module.exports = { addProductSchema };
