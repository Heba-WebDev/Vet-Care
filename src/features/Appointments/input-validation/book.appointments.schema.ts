import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const bookAppointmentsSchema = joi.object({
  date: joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
    "string.empty": "A valid date is required.",
    "string.required": "A valid date is required.",
    "string.pattern.base": "A valid date of format yyyy:mm:dd is required.",
    "string.pattern": "A valid date of format yyyy:mm:dd is required."
  }),
  time: joi.string().pattern(/^(0[8-9]|1[0-6]):[0-5]\d:[0-5]\d$/).required().messages({
    "string.empty": "A valid time is required.",
    "string.required": "A valid time is required.",
    "string.pattern.base": "A valid working time of format hh:mm:ss is required.",
    "string.pattern": "A valid working time of format hh:mm:ss is required."
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
