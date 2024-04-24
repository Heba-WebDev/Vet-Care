import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const payTransactionSchema = joi.object({
  transaction_id: joi
  .string()
  .id()
  .required()
  .messages({
    "string.empty": "A valid transaction id is required.",
    "string.required": "A valid transaction id is required.",
  })
});

const payTransactionValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await payTransactionSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { payTransactionValidation }
