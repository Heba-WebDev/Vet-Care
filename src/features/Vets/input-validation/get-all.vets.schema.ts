import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
import { globalError } from "../../../utils/globalError";
const {FAIL} = statusCode


const getAllVetsSchema = joi.object({
    id: joi
    .string()
    .id()
    .optional()
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
    }),
});

const getAllVetsValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getAllVetsSchema.validateAsync(req.query);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { getAllVetsValidation };
