import Joi from "joi";
import "@babel/polyfill";

const validateUser = {
  async validateUpdate(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .trim()
        .min(3)
        .max(255)
        .email(),
      password: Joi.string()
        .trim()
        .min(6)
        .max(255),
      newPassword: Joi.string()
        .trim()
        .min(6)
        .max(255)
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

export default validateUser;
