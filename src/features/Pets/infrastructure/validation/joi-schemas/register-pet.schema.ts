import joi from 'joi';

export const petRegisterSchema = joi.object({
  owner_id: joi.string().uuid().required().messages({
    'string.empty': 'A valid owner_id is required.',
    'string.required': 'A valid owner_id is required.',
    'string.uuid': 'A valid owner_id is required.',
  }),

  name: joi.string().required().messages({
    'string.empty': 'A pet name is required.',
    'string.required': 'A pet name is required.',
  }),

  gender: joi.string().valid('Male', 'Female').required().messages({
    'string.empty': 'A valid gender is required.',
    'string.email': 'A valid gender is required.',
    'string.valid': 'A valid gender is required, male or female.',
  }),

  animal_id: joi.number().required().messages({
    'number.empty': 'A valid animal id is required.',
    'number.required': 'A valid animal id is required.',
  }),
});
