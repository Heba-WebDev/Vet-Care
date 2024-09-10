import joi from 'joi';

export const petGetAllSchema = joi.object({
  owner_id: joi.string().uuid().required().messages({
    'string.empty': 'A valid owner_id is required.',
    'string.required': 'A valid owner_id is required.',
    'string.uuid': 'A valid owner_id is required.',
  }),
});
