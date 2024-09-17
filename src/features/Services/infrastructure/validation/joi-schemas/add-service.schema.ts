import joi from 'joi';

export const addServiceSchema = joi.object({
  type: joi.string().required().messages({
    'string.empty': 'A service type is required.',
    'string.required': 'A service type is required.',
  }),
  price: joi.number().required().messages({
    'number.empty': 'A valid price is required.',
    'number.required': 'A valid price is required.',
  }),
});
