import joi from 'joi';

export const getAllServicesSchema = joi.object({
  page: joi.number().optional().messages({
    'string.page': 'A valid number is required.',
  }),

  limit: joi.number().optional().messages({
    'string.page': 'A valid number is required.',
  }),

  active: joi.string().optional().max(4).min(4).allow(null),
});
