import joi from 'joi';

export const deleteSchema = joi.object({
    id: joi.string().uuid().required().messages({
        'string.empty': 'A valid id is required.',
        'string.required': 'A valid id is required.',
        'string.uuid': 'A valid id is required.',
    }),

    exit_reason: joi.string().min(5).max(50).optional().messages({
        'string.empty': 'A valid exit reason is required.',
        'string.min': 'An exit reason must be more than 5 characters.',
        'string.max': 'An exit reason must be less than 50 characters.',
    }),
});
