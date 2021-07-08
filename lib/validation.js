const Joi = require("@hapi/joi");

class Validation {
  register(data) {
    const schema = Joi.object({
      name: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
      password_confirmation: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("Confirm password")
        .messages({ "any.only": "Passwords must match" }),
    });
    return schema.validate(data);
  }
  login(data) {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(data);
  }
  post(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      categories: Joi.alternatives().try(Joi.array(), Joi.string()),
      location: Joi.array(),
      images: Joi.array(),
      place: Joi.string(),
    });
    return schema.validate(data);
  }
}

module.exports = Validation;
