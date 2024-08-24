import joi from 'joi';

export const ownerRegisterSchema = joi.object({
    name: joi.string().required().messages({
        'string.empty': 'Full name is required.',
        'string.required': 'Full name is required.',
    }),

    email: joi.string().email().required().messages({
        'string.empty': 'A valid email is required.',
        'string.email': 'A valid email is required.',
    }),

    phone_number: joi
        .string()
        .pattern(new RegExp('^[\\d\\s-]*$'))
        .min(6)
        .required()
        .messages({
            'string.empty': 'A valid phone number is required.',
            'string.required': 'A valid phone number is required.',
            'string.pattern':
                'A phone number can only contain digits, - or white space.',
        }),
});
