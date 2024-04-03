import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
import { globalError } from "../../../utils/globalError";
const {FAIL} = statusCode


const ownerUpdateSchema = joi.object({
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
  name: joi
    .string()
    .optional()
    .messages({
      "string.empty": "A valid name is required.",
      "string.required": "A valid name is required.",
    }),
    phone_number: joi.string().pattern(new RegExp("^[\\d\\s-]*$")).min(6).optional().messages({
      "string.empty": "A valid phone number is required.",
      "string.required": "A valid phone number is required.",
      "string.pattern": "A phone number can only contain digits, - or white space.",
      "string.optional": "A valid phone number is required.",
    }),
});

const ownerUpdateValidation = async (req: Request, res: Response, next: NextFunction) => {
  const {id, email, password, phone_number, job_title} = req.body;
  if(!email && !password && !phone_number && !job_title) {
    const err = new globalError("Please provide an email, a password or a phone number to update.", 400, FAIL);
    return next(err);
  }

  try {
    await ownerUpdateSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { ownerUpdateValidation };
