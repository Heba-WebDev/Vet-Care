import joi from 'joi';

export const updateHolidaySchema = joi.object({
  id: joi.string().uuid().required().messages({
    'string.empty': 'A valid holiday id is required',
    'string.required': 'A valid holiday id is required',
    'string.uuid': 'A valid holiday id is required',
  }),
  name: joi.string().required().min(3).max(25).messages({
    'string.empty': 'A valid holiday name is required',
    'string.required': 'A valid holiday name is required',
    'string.min': 'A holiday name must be more of 3 characters',
    'string.max': 'A holiday name must be less than 26 characters',
  }),
  date: joi.date().required().messages({
    'date.empty': 'A valid holiday date is required',
    'date.required': 'A valid holiday date is required',
  }),
});
