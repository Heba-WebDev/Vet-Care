import joi from 'joi';

export const getAllOwnersSchema = joi.object({
  id: joi.string().uuid().optional().messages({
    "string.uuid": "Provide a valid owner id"
  }),

  name: joi.string().optional(),

  email: joi
    .string()
    .email()
    .optional()
    .messages({
    "string.email": "Provide a valid email.",
    }),

  phone_number: joi.string().pattern(new RegExp("^[\\d\\s-]*$")).min(6).optional().messages({
    "string.optional": "Provide a valid phone number.",
    "string.pattern": "A phone number can only contain digits, - or white space.",
    }),
});
