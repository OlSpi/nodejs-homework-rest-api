const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  number: Joi.number().required(),
});

module.exports = contactSchema;