import joi from 'joi';

export const addHolidaySchema = joi.object({
  name: joi.string().required().min(3).max(25).messages({
    'string.empty': 'A valid holiday name is required',
    'string.required': 'A valid holiday name is required',
    'string.min': 'A holiday name must be more of 3 characters',
    'string.max': 'A holiday name must be less than 26 characters',
  }),
  date: joi
    .string()
    .required()
    .pattern(new RegExp('^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\\d{4}$'))
    .messages({
      'string.empty': 'A valid holiday date is required',
      'string.required': 'A valid holiday date is required',
      'string.pattern.base': 'A valid holiday date follows dd/mm/yyyy pattern',
    }),
});
