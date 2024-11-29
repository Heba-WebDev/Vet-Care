import joi from 'joi';

export const addWorkingHoursSchema = joi.object({
  vet_id: joi.string().uuid().required().messages({
    'stringg.empty': 'A valid vet id is required',
    'stringg.required': 'A valid vet id is required',
    'stringg.uuid': 'A valid vet id is required',
  }),
  day_id: joi.number().integer().required().messages({
    'number.empty': 'A valid day id is required',
    'number.required': 'A valid day id is required',
    'number.integer': 'A valid day id is required'
  }),
  start_time: joi.string().pattern(new RegExp('^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$')).required().messages({
    'string.required': 'A valid start_time is required',
    'string.pattern': 'A valid start_time in hh:mm:ss format is required',
  }),
  end_time: joi.string().pattern(new RegExp('^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$')).required().messages({
    'string.required': 'A valid end_time is required',
    'string.pattern': 'A valid end_time in hh:mm:ss format is required',
  }),
});
