import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const staffVerifySchema = joi.object({
  email: joi
    .string()
    .email()
    .required()
    .messages({
      "string.empty": "A valid email is required.",
      "string.email": "A valid email is required.",
    }),
});

const vetsVerifyValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await staffVerifySchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { vetsVerifyValidation };
