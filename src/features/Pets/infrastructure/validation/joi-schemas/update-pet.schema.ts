import joi from 'joi';

export const petUpdateSchema = joi.object({
  pet_id: joi.string().uuid().required().messages({
    'string.empty': 'A valid pet_id is required.',
    'string.required': 'A valid pet_id is required.',
    'string.uuid': 'A valid pet_id is required.',
  }),

  owner_id: joi.string().uuid().required().messages({
    'string.empty': 'A valid owner_id is required.',
    'string.required': 'A valid owner_id is required.',
    'string.uuid': 'A valid owner_id is required.',
  }),

  name: joi.string().optional().messages({
    'string.optional': 'A pet name is required.',
  }),

  gender: joi.string().valid('Male', 'Female').optional().messages({
    'string.valid': 'A valid gender is required, male or female.',
  }),

  animal_id: joi.string().optional().pattern(new RegExp('^[0-9]+$')).messages({
    'string.pattern': 'A valid animal id must contain only digits.',
  }),
});
