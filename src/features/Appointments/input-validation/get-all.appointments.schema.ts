import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const getAllAppointmentsSchema = joi.object({
  vet_id: joi
    .string()
    .id()
    .optional()
    .messages({
      "string.empty": "A valid vet id is required.",
      "string.id": "A valid vet id is required.",
    }),
});

const getAllAppointmentsValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await getAllAppointmentsSchema.validateAsync(req.params);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { getAllAppointmentsValidation };
