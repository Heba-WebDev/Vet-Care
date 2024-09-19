import joi from 'joi';

export const updateServiceSchema = joi.object({
  id: joi.number().id().required().messages({
    'id.number': 'A valid service id is required',
    'id.required': 'A service id is required',
  }),
  type: joi.string().optional().messages({
    'string.empty': 'A service type is required.',
    'string.required': 'A service type is required.',
  }),
  price: joi.number().optional().messages({
    'number.empty': 'A valid price is required.',
    'number.required': 'A valid price is required.',
  }),
});
