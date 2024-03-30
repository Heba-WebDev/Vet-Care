import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const addServiceSchema = joi.object({
  type: joi.string().required().messages({
    "string.empty": "A service type is required.",
    "string.required": "A service type is required.",
  }),
  price: joi
    .number()
    .required()
    .messages({
      "number.empty": "A valid price is required.",
      "number.required": "A valid price is required.",
    }),
});

const addServiceValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await addServiceSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { addServiceValidation };
