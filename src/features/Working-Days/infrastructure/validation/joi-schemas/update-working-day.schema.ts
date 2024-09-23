import joi from 'joi';

export const updateWorkingDaySchema = joi.object({
  id: joi.number().required().messages({
    'id.number': 'A valid working day id is required',
    'id.required': 'An working day id is required',
  }),
  active: joi.boolean().required().messages({
    'boolean.base': 'Active must be either true or false',
    'boolean.required': 'Active is required',
  }),
});
