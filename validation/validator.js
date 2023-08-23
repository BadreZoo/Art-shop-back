function validate(schema, dataSource) {

    return async (request, response, next) => {
      try {
  
        await schema.validateAsync(request[dataSource]);
        next();
      } catch (err) {
        response.status(400).json({ error: err.details[0].message });
      }
    };
  }
  
  module.exports = validate;
  