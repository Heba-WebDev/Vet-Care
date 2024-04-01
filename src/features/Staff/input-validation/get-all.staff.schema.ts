import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const getAllStaffSchema = joi.object({
  email: joi
    .string()
    .email()
    .optional()
    .messages({
      "string.empty": "A valid email is required.",
      "string.email": "A valid email is required.",
    }),
});

const getAllStaffValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await getAllStaffSchema.validateAsync(req.query);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { getAllStaffValidation };
