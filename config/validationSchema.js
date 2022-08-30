const Joi = require('joi') 

const schemas = { 
  users: Joi.object().keys({ 
    name: Joi.string(),
    username: Joi.string().alphanum().min(5).max(10),
    password: Joi.string().required().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(10).required(),
    Language: Joi.array().items({
      lang: Joi.string().required(),
      format: Joi.string().required()
    })
  }) 
}; 

module.exports = schemas;
