const Joi = require("joi");
const errorFunction = require("../utils/errorFunction");

const patternPhoneNummber = /[0]{1}[0-9]{9}/

const addOrdersSchema = Joi.object({
  userId: Joi.string().max(100).required(),
  customerName: Joi.string().min(5).max(100).required(),
  customerPhone: Joi.string()
  .length(10)
  .trim()
  .pattern(new RegExp(patternPhoneNummber))
  .required(),
  customerAddress: Joi.string().max(100).required(),
  productId: Joi.string().max(100).required(),
  productName: Joi.string().min(5).max(100).required(),
  productBrand: Joi.string().max(100).required(),
  type: Joi.string().max(100).required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  orderStatus: Joi.number().required(),
  images: Joi.array().items(Joi.string().required()),
});

const orderValidation= (req, res, next) => {
  const { error } = addOrdersSchema.validate(req.body);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, 406, `Error in Order Data: ${error.message}`)
    );
  } else {
    next();
  }
}

module.exports = { orderValidation };