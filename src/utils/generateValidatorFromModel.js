const Joi = require('joi');

const generateValidatorFromModel = (model) => {
  const schema = Joi.object(
    Object.entries(model.schema.paths).reduce((acc, [key, path]) => {
      if (key !== '__v' && key !== '_id') {
        const isRequired = path.isRequired || false;
        const type = path.instance.toLowerCase();
        let validator;

        switch (type) {
          case 'string':
            validator = Joi.string();
            break;
          case 'number':
            validator = Joi.number();
            break;
          case 'date':
            validator = Joi.date();
            break;
          case 'boolean':
            validator = Joi.boolean();
            break;
          case 'objectid':
            validator = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
            break;
          case 'array':
            validator = Joi.array();
            break;
          case 'mixed':
            validator = Joi.any();
            break;
          // Add more cases for custom types if needed
          default:
            validator = Joi.any();
        }

        if (isRequired) {
          validator = validator.required();
        }

        acc[key] = validator;
      }
      return acc;
    }, {})
  );

  return schema;
};

module.exports = generateValidatorFromModel;
