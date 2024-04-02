import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const getAllOwnersSchema = joi.object({
    phone_number: joi.string().pattern(new RegExp("^[\\d\\s-]*$")).min(6).optional().messages({
      "string.empty": "A valid phone number is required.",
      "string.required": "A valid phone number is required.",
      "string.pattern": "A phone number can only contain digits, - or white space.",
    }),
    email: joi.string().email().optional().messages({
    "string.empty": "A valid email is required.",
    "email.empty": "A valid email is required.",
    "email.required": "A valid email is required.",
  }),
});

const getAllOwnersValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await getAllOwnersSchema.validateAsync(req.query);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { getAllOwnersValidation };
