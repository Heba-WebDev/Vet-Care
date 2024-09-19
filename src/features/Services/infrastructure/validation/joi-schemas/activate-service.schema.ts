import joi from 'joi';

export const activateServiceSchema = joi.object({
  id: joi.number().id().required().messages({
    'id.number': 'A valid service id is required',
    'id.required': 'A service id is required',
  }),
});
