const validate = (schema) => async (req, res, next) => {
    try {
      const validatedBody = await schema.validateAsync(req.body);
      req.body = validatedBody;
      next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  module.exports = validate;