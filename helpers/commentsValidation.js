const Joi = require("joi");
const errorFunction = require("../utils/errorFunction");

const addCommentsSchema = Joi.object({
    userId: Joi.string().max(100).required(), 
    customerName: Joi.string().min(5).max(100).required(),
    productId: Joi.string().max(100).required(),
    productName: Joi.string().min(5).max(100).required(),
    comment: Joi.string().min(1).required(),
    rate: Joi.string().max(100).required(),
});

const commentsValidation= (req, res, next) => {
    const { error } = addCommentsSchema.validate(req.body);
    if (error) {
      res.status(406);
      return res.json(
        errorFunction(true, 406, `Error in comment Data: ${error.message}`)
      );
    } else {
      next();
    }
  }

  
module.exports = {commentsValidation}