import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const cancelAppointmentsSchema = joi.object({
  id: joi
    .string()
    .id()
    .required()
    .messages({
      "string.empty": "A valid appointment id is required.",
      "string.id": "A valid appointment id is required.",
    }),
});

const cancelAppointmentsValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await cancelAppointmentsSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { cancelAppointmentsValidation };
