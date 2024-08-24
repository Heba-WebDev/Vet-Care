import joi from 'joi';

export const DeleteSchema = joi.object({
    id: joi.string().uuid().required().messages({
        'string.empty': 'An id is required.',
        'string.uuid': 'A valid id is required.',
        'string.required': 'An id is required.',
    }),

    exit_reason: joi.string().min(5).max(50).optional().messages({
        'string.empty': 'An exit reason is required.',
        'string.min': 'A meaningful exist reason is required',
        'string.max': "An exist reason can't exceed 50 characters",
    }),
});
