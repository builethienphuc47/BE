const Joi = require("joi");
const errorFunction = require("../utils/errorFunction");

const addHistoriesSchema = Joi.object({
  userId: Joi.string().max(100).required(),
  productId: Joi.string().max(100).required(),
  productName: Joi.string().min(5).max(100).required(),
  productBrand: Joi.string().max(100).required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  images: Joi.array().items(Joi.string().required()),
});

const historiesValidation= (req, res, next) => {
  const { error } = addHistoriesSchema.validate(req.body);
  if (error) {
    res.status(406);
    return res.json(
      errorFunction(true, 406, `Error in historie Data: ${error.message}`)
    );
  } else {
    next();
  }
}

module.exports = { historiesValidation };