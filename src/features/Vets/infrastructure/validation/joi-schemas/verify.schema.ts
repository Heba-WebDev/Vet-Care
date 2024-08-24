import joi from 'joi';

export const verifySchema = joi.object({
    email: joi.string().email().required().messages({
        'string.empty': 'A valid email is required.',
        'string.email': 'A valid email is required.',
    }),
});
