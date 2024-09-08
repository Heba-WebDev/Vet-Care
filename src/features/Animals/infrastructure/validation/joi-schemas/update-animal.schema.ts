import joi from 'joi';

export const updateAnimalSchema = joi.object({
  id: joi.number().required().messages({
    'id.number': 'A valid animal id is required',
    'id.required': 'An animal id is required',
  }),

  isDeleted: joi.bool().optional(),

  isSupported: joi.bool().optional(),
});
