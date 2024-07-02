import joi from 'joi';

const getAllSchema = joi.object({
  email: joi
    .string()
    .email()
    .optional()
    .messages({
      "string.empty": "A valid email is required.",
      "string.email": "A valid email is required.",
    }),
});