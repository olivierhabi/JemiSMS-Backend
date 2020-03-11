import Joi from "joi";
import "@babel/polyfill";

const validateBalance = {
  async validate(req, res, next) {
    const schema = Joi.object().keys({
      balance: Joi.number()
        .min(0)
        .required()
    });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res
        .status(400)
        .send({ status: 400, message: error.details[0].message });
    }
    next();
  }
};

export default validateBalance;
