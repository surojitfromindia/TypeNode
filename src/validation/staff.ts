import Joi from 'joi';

const staffNameErrorMessage: Joi.LanguageMessages = {
  'string.max': 'Name must be less than 50 characters',
  'string.min': 'Name cannot be less than 3 characters',
};

const staffSchema: Joi.ObjectSchema = Joi.object({
  first_name: Joi.string()
    .required()
    .min(3)
    .max(50)
    .messages(staffNameErrorMessage),
  last_name: Joi.string()
    .required()
    .min(3)
    .max(50)
    .messages(staffNameErrorMessage),

  email: Joi.string().required().email(),
  temporalPassword: Joi.string().length(10),
});

export { staffSchema };
