import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const animalsRegistrationSchema = joi.object({
  type: joi.string().required().messages({
    "string.empty": "An animal type is required.",
    "string.required": "An animal type is required.",
  }),
});

const animalsRegistrationValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await animalsRegistrationSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { animalsRegistrationValidation };
