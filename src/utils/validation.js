const Joi = require('joi');

exports.exampleValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
  });

  return schema.validate(data);
};