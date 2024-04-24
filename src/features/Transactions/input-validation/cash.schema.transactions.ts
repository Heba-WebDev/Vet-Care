import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const cashTransactionSchema = joi.object({
  owner_id: joi.string().id().required().messages({
  "string.empty": "An owner id is required.",
  "string.required": "An animal id is required.",
  }),
  pet_id: joi.string().id().required().messages({
  "string.empty": "A valid pet id is required.",
  "string.required": "A valid pet id is required.",
  }),
  service_id: joi
  .number()
  .id()
  .required()
  .messages({
    "number.empty": "A valid service id is required.",
    "number.required": "A valid service id is required.",
  })
});

const cashBillValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await cashTransactionSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { cashBillValidation };
