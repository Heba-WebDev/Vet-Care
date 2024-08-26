import joi from 'joi';

export const ownerUpdateSchema = joi.object({
  id: joi.string().uuid().required().messages({
    'string.required': 'A valid owner id is required.',
    'string.uuid': 'A valid owner id is required.',
  }),

  name: joi.string().optional().messages({
    'string.optional': 'Provide a valid full name.',
  }),

  email: joi.string().email().optional().messages({
    'string.email': 'Provide a valid email.',
  }),

  phone_number: joi.string().pattern(new RegExp('^[\\d\\s-]*$')).min(6).optional().messages({
    'string.optional': 'Provide a valid phone number.',
    'string.pattern': 'A phone number can only contain digits, - or white space.',
  }),
});
