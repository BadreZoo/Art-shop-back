const Joi = require('joi');

const generalRulesNames = Joi.string()
  .min(2)
  .required()
  .max(64)
  .pattern(/^[a-zA-ZÀ-ÿ '-]+$/);

const userSchema = Joi.object({
  nom: generalRulesNames,
  prenom: generalRulesNames,
  sex: Joi.string()
    .valid('homme', 'femme', 'autre')
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
});

module.exports = userSchema;
