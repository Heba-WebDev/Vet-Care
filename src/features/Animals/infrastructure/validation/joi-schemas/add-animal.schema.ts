import joi from 'joi';

export const addAnimalSchema = joi.object({
    type: joi.string().required().messages({
    'string.empty': 'An animal type is required.',
    'string.required': 'An animal type is required.',
  }),

  isSupported: joi.bool().optional(),
});
