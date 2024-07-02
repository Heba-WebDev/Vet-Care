import joi from 'joi';

export const deleteSchema = joi.object({
  id: joi
    .string()
    .id()
    .required()
    .messages({
      "string.empty": "A valid id is required.",
      "string.id": "A valid id is required.",
    }),
  exit_reason: joi.string().min(5).required().messages({
    "string.empty": "A valid exit reason is required.",
    "string.required": "A valid exit reason is required.",
    "string.min": "Please provide a valid exit reason."
  })
});