import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const vetsLoginSchema = joi.object({
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
    }),
});

const vetsLoginValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await vetsLoginSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { vetsLoginValidation };
