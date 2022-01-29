import Joi from 'joi';

const shopNameErrorMessage: Joi.LanguageMessages = {
  'string.max': 'Name must be less than 50 characters',
  'string.min': 'Name cannot be less than 3 characters',
};
const shopStaffCountMessage: Joi.LanguageMessages = {
  'number.min': 'Shop must have at least 1 working staff',
};

const shop: Joi.ObjectSchema = Joi.object({
  name: Joi.string().required().min(3).max(50).messages(shopNameErrorMessage),
  staff_count: Joi.number().required().min(1).messages(shopStaffCountMessage),
  sub_shops: Joi.array().items(Joi.link('#shop')),
}).id('shop');

export { shop as shopSchema };
