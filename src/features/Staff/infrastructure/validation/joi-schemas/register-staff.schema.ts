import joi from 'joi';

export const registerSchema = joi.object({
  name: joi.string().required().messages({
    'string.empty': 'Full name is required.',
    'string.required': 'Full name is required.',
  }),

  email: joi.string().email().required().messages({
    'string.empty': 'A valid email is required.',
    'string.email': 'A valid email is required.',
  }),

  password: joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required().messages({
    'string.empty': 'A valid password is required.',
    'string.required': 'A valid password is required.',
    'string.min': 'Password must have at least 6 characters.',
    'string.pattern': 'A password must be of 6 characters or more.',
  }),

  phone_number: joi.string().pattern(new RegExp('^[\\d\\s-]*$')).min(6).required().messages({
    'string.empty': 'A valid phone number is required.',
    'string.required': 'A valid phone number is required.',
    'string.pattern': 'A phone number can only contain digits, - or white space.',
  }),

  job_title: joi.string().required().messages({
    'string.empty': 'A valid job title is required.',
    'string.required': 'A valid job title is required.',
  }),
});
