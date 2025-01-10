import joi from 'joi';

export const updateWorkingHoursSchema = joi.object({
  vet_id: joi.string().uuid().required().messages({
    'stringg.empty': 'A valid vet id is required',
    'stringg.required': 'A valid vet id is required',
    'stringg.uuid': 'A valid vet id is required',
  }),
  workday_id: joi.string().uuid().required().messages({
    'string.empty': 'A valid workday_id is required',
    'string.uuid': 'A valid workday_id is required',
    'string.required': 'A valid workday_id is required',
    'string.integer': 'A valid workday_id is required',
  }),
  start_time: joi
    .string()
    .pattern(new RegExp('^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$'))
    .required()
    .messages({
      'string.required': 'Provide a valid start_time',
      'string.pattern': 'A valid start_time in hh:mm:ss format is required',
    }),
  end_time: joi
    .string()
    .pattern(new RegExp('^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$'))
    .required()
    .messages({
      'string.required': 'Provide a valid end_time',
      'string.pattern': 'A valid end_time in hh:mm:ss format is required',
    }),
  break_start_time: joi
    .string()
    .pattern(new RegExp('^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$'))
    .required()
    .messages({
      'string.required': 'Provide a valid breat_start_time',
      'string.pattern': 'A valid breat_start_time in hh:mm:ss format is required',
    }),
  break_end_time: joi
    .string()
    .pattern(new RegExp('^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$'))
    .required()
    .messages({
      'string.required': 'Provide a valid break_end_time',
      'string.pattern': 'A valid breat_end_time in hh:mm:ss format is required',
    }),
});
