import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const getAllPetsSchema = joi.object({
    id: joi.string().id().optional().messages({
      "string.empty": "A valid pet id is required.",
      "string.required": "A valid pet id is required.",
    }),
    type: joi.string().optional().messages({
    "string.empty": "A valid pet type is required.",
      "string.required": "A valid type id is required.",
    }),
    owner_id: joi.string().id().optional().messages({
      "string.empty": "A valid owner id is required.",
      "string.required": "A valid owner id is required.",
    }),
    owner_phone_number: joi.string().pattern(new RegExp("^[\\d\\s-]*$")).min(6).optional().messages({
      "string.empty": "A valid owner's phone number is required.",
      "string.required": "A valid owner's phone number is required.",
      "string.pattern": "An owner's phone number can only contain digits, - or white space.",
    }),
    owner_email: joi.string().email().optional().messages({
    "string.empty": "A valid owner's email is required.",
    "email.empty": "A valid owner's email is required.",
    "email.required": "A valid owner's email is required.",
  }),
});

const getAllPetsValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await getAllPetsSchema.validateAsync(req.query);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { getAllPetsValidation };
