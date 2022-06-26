import Joi from 'joi';

const emailErrorMessage: Joi.LanguageMessages = {
  'any.required': 'A email is required',
  'string.required': 'A email is required',
};

const passwordErrorMessage: Joi.LanguageMessages = {
  'any.required': 'Password is required',
  'string.length': 'Password must have atleast 8 charaters',
};

const userSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().email().required().messages(emailErrorMessage),
  password: Joi.string().required().length(8).messages(passwordErrorMessage),
});

export { userSchema };
