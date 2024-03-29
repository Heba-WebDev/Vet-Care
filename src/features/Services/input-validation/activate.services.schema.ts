import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const activateServiceSchema = joi.object({
  id: joi.string().id().messages({
    "string.empty": "A valid id is required.",
    "string.required": "A valid id is required.",
  }),
});

const activateServiceValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await activateServiceSchema.validateAsync(req.params);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { activateServiceValidation };
