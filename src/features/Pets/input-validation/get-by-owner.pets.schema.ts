import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
import { globalError } from "../../../utils/globalError";
const {FAIL} = statusCode


const ownerPetsSchema = joi.object({
  id: joi
    .string()
    .id()
    .optional()
    .messages({
      "string.empty": "A valid id is required.",
      "string.id": "A valid id is required.",
    }),
     phone_number: joi.string().pattern(new RegExp("^[\\d\\s-]*$")).min(6).optional().messages({
      "string.empty": "A valid phone number is required.",
      "string.required": "A valid phone number is required.",
      "string.pattern": "A phone number can only contain digits, - or white space.",
    }),
});

const ownerPetsValidation = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.params.id && !req.params.phone_number) {
        const err = new globalError("An id or a phone_number are required.", 400, FAIL);
        return next(err);
    }
    try {
    await ownerPetsSchema.validateAsync(req.params);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { ownerPetsValidation };
