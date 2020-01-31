import Joi from "joi";
import "@babel/polyfill";

const validateLogin = {
  async validate(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .min(1)
        .required()
    });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      return res
        .status(404)
        .send({ status: 404, message: error.details[0].message });
    }
    next();
  }
};

export default validateLogin;
