import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const ownerRegistrationSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Full name is required.",
    "string.required": "Full name is required.",
  }),
  email: joi
    .string()
    .email()
    .required()
    .messages({
      "string.empty": "A valid email is required.",
      "string.email": "A valid email is required.",
    }),
    phone_number: joi.string().pattern(new RegExp("^[\\d\\s-]*$")).min(6).required().messages({
      "string.empty": "A valid phone number is required.",
      "string.required": "A valid phone number is required.",
      "string.pattern": "A phone number can only contain digits, - or white space.",
    })
});

const ownerRegistrationValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await ownerRegistrationSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { ownerRegistrationValidation };
