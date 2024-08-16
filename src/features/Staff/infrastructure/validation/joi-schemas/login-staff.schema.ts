import joi from 'joi';

export const loginSchema = joi.object({
 email: joi
   .string()
   .email()
   .required()
   .messages({
   "string.empty": "A valid email is required.",
   "string.email": "A valid email is required.",
   }),

 password: joi
   .string()
   .min(6)
   .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
   .required()
   .messages({
   "string.empty": "A valid password is required.",
   "string.required": "A valid password is required.",
   "string.min": "Password must have at least 6 characters.",
   "string.pattern": "A password must be of 6 characters or more.",
   })
});
