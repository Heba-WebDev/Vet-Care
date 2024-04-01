import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
import { globalError } from "../../../utils/globalError";
const {FAIL} = statusCode


const staffUpdateSchema = joi.object({
  id: joi
    .string()
    .id()
    .required()
    .messages({
      "string.empty": "A valid id is required.",
      "string.id": "A valid id is required.",
    }),
    email: joi
    .string()
    .email()
    .optional()
    .messages({
      "string.empty": "A valid email is required.",
      "string.email": "A valid email is required.",
      "string.optional": "A valid email is required.",
    }),
  password: joi
    .string()
    .min(6)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .optional()
    .messages({
      "string.empty": "A valid password is required.",
      "string.required": "A valid password is required.",
      "string.min": "Password must have at least 6 characters.",
      "string.pattern": "A password must be of 6 characters or more.",
      "string.optional": "A valid password is required.",
    }),
    phone_number: joi.string().pattern(new RegExp("^[\\d\\s-]*$")).min(6).optional().messages({
      "string.empty": "A valid phone number is required.",
      "string.required": "A valid phone number is required.",
      "string.pattern": "A phone number can only contain digits, - or white space.",
      "string.optional": "A valid phone number is required.",
    }),
    job_title: joi.string().optional().messages({
      "string.empty": "A valid job title is required.",
      "string.optional": "A valid job title is required."
    })
});

const staffUpdateValidation = async (req: Request, res: Response, next: NextFunction) => {
  const {id, email, password, phone_number, job_title} = req.body;
  if(!email && !password && !phone_number && !job_title) {
    const err = new globalError("Please provide an email, a password or a phone number to update.", 400, FAIL);
    return next(err);
  }

  try {
    await staffUpdateSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { staffUpdateValidation };
