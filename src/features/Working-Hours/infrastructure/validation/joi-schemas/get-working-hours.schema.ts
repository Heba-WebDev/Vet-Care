import joi from 'joi';

export const getWorkingHoursSchema = joi.object({
  vet_id: joi.string().uuid().required().messages({
    'string.empty': 'A valid vet_id is required.',
    'string.required': 'A valid vet_id is required.',
    'string.uuid': 'A valid vet_id is required.',
  }),
  page: joi.number().optional().messages({
    'string.empty': 'A number for page is required.',
    'string.page': 'A number is required.',
  }),

  limit: joi.number().optional().messages({
    'string.empty': 'A number for page is required.',
    'string.page': 'A number is required.',
  }),
});
