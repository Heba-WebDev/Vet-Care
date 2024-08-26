import joi from 'joi';

export const updateSchema = joi.object({
  id: joi.string().uuid().required().messages({
    'string.empty': 'A valid id is required.',
    'string.uuid': 'A valid id is required.',
  }),

  name: joi.string().optional().messages({
    'string.empty': 'Full name is required.',
    'string.required': 'Full name is required.',
  }),

  email: joi.string().email().optional().messages({
    'string.empty': 'A valid email is required.',
    'string.email': 'A valid email is required.',
    'string.optional': 'A valid email is required.',
  }),

  password: joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).optional().messages({
    'string.empty': 'A valid password is required.',
    'string.required': 'A valid password is required.',
    'string.min': 'Password must have at least 6 characters.',
    'string.pattern': 'A password must be of 6 characters or more.',
  }),

  phone_number: joi.string().pattern(new RegExp('^[\\d\\s-]*$')).min(6).optional().messages({
    'string.empty': 'A valid phone number is required.',
    'string.required': 'A valid phone number is required.',
    'string.pattern': 'A phone number can only contain digits, - or white space.',
    'string.optional': 'A valid phone number is required.',
  }),

  job_title: joi.string().optional().messages({
    'string.empty': 'A valid job title is required.',
    'string.optional': 'A valid job title is required.',
  }),
});
