import Joi from "joi";
import "@babel/polyfill";

const validateContact = {
  async validate(req, res, next) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .trim()
        .min(3)
        .max(50),
      phone: Joi.string()
        .trim()
        .min(10)
        .max(255)
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

export default validateContact;
