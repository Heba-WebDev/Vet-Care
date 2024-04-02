import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
import { globalError } from "../../../utils/globalError";
const {FAIL} = statusCode


const PetsUpdateSchema = joi.object({
  id: joi.string().id().required().messages({
    "string.empty": "A pet's id is required.",
    "string.required": "A pet's id is required.",
  }),
  name: joi.string().optional().messages({
    "string.empty": "Full name is required.",
    "string.required": "Full name is required.",
  }),
  owner_id: joi
    .string()
    .id()
    .optional()
    .messages({
      "string.empty": "A valid owner id is required.",
      "string.id": "A valid owner id is required.",
    }),
  type: joi.string().optional().messages({
    "string.empty": "An animal type is required.",
    "string.required": "An animal type is required.",
  }),
  gender: joi.string().optional().messages({
    "string.empty": "An animal gender is required.",
    "string.required": "An animal gender is required.",
  }),
});

const petsUpdateValidation = async (req: Request, res: Response, next: NextFunction) => {
  const {name, type, gender } = req.body;
  if(!name && !type && !gender) {
    const err = new globalError("A name, type or a gender is required to update a pet's profile.", 400
        ,FAIL);
        return next(err);
  }
  try {
    await PetsUpdateSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { petsUpdateValidation };
