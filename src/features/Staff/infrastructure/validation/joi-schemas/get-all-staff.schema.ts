import joi from 'joi';

export const getAllSchema = joi.object({
  page: joi
    .number()
    .optional()
    .messages({
      "string.empty": "A number for page is required.",
      "string.page": "A number is required.",
    }),
    limit: joi
    .number()
    .optional()
    .messages({
      "string.empty": "A number for page is required.",
      "string.page": "A number is required.",
    }),
});
