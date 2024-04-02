import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const bookAppointmentsSchema = joi.object({
  date: joi.date().required().messages({
    "date.empty": "A valid date is required.",
    "date.required": "A valid date is required.",
  }),
  vet_id: joi
    .string()
    .id()
    .required()
    .messages({
      "string.empty": "A valid vet id is required.",
      "string.id": "A valid vet id is required.",
    }),
    owner_id: joi
    .string()
    .id()
    .required()
    .messages({
      "string.empty": "A valid owner id is required.",
      "string.id": "A valid owner id is required.",
    }),
    pet_id: joi
    .string()
    .id()
    .required()
    .messages({
      "string.empty": "A valid pet id is required.",
      "string.id": "A valid pet id is required.",
    }),
    service_type: joi
    .string()
    .required()
    .messages({
      "string.empty": "A valid service type is required.",
      "string.id": "A valid service type is required.",
    }),
});

const bookAppointmentsValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await bookAppointmentsSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { bookAppointmentsValidation };
