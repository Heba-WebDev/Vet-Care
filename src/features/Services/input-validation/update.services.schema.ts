import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const updateServiceSchema = joi.object({
  id: joi
    .string()
    .id()
    .required()
    .messages({
      "string.empty": "A valid id is required.",
      "string.id": "A valid id is required.",
    }),
    type: joi.string().optional().messages({
    "string.empty": "A service type is required.",
    "string.optional": "A service type is required.",
  }),
  price: joi
    .number()
    .optional()
    .messages({
      "number.empty": "A valid price is required.",
      "number.optional": "A valid price is required.",
    }),
});

const updateServiceValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await updateServiceSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { updateServiceValidation };
