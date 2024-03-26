import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const staffDeleteSchema = joi.object({
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

const staffDeleteValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await staffDeleteSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { staffDeleteValidation };
