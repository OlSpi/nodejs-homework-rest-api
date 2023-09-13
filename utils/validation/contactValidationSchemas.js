const Joi = require("joi");

const addContactValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  number: Joi.number().required(),
  favorite: Joi.boolean(),
});

const updateContactValidationSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  number: Joi.number(),
  favorite: Joi.boolean(),
}).or("name", "email", "number", "favorite");

module.exports = { addContactValidationSchema, updateContactValidationSchema };
