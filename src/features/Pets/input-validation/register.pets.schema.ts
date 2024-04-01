import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const PetsRegistrationSchema = joi.object({
  name: joi.string().required().messages({
    "string.empty": "Full name is required.",
    "string.required": "Full name is required.",
  }),
  owner_id: joi
    .string()
    .id()
    .required()
    .messages({
      "string.empty": "A valid owner id is required.",
      "string.id": "A valid owner id is required.",
    }),
  type: joi.string().required().messages({
    "string.empty": "An animal type is required.",
    "string.required": "An animal type is required.",
  }),
  gender: joi.string().required().messages({
    "string.empty": "An animal gender is required.",
    "string.required": "An animal gender is required.",
  }),
});

const petsRegistrationValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await PetsRegistrationSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { petsRegistrationValidation };
