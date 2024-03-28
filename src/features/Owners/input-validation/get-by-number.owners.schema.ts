import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const ownerByNumberSchema = joi.object({
    phone_number: joi.string().pattern(new RegExp("^[\\d\\s-]*$")).min(6).required().messages({
      "string.empty": "A valid phone number is required.",
      "string.required": "A valid phone number is required.",
      "string.pattern": "A phone number can only contain digits, - or white space.",
    }),
});

const ownerByNumberValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await ownerByNumberSchema.validateAsync(req.params);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { ownerByNumberValidation };
