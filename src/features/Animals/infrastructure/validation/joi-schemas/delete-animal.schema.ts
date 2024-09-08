import joi from 'joi';

export const deleteAnimalSchema = joi.object({
  id: joi.number().required().messages({
    'id.number': 'A valid animal id is required',
    'id.required': 'An animal id is required',
  }),
});
