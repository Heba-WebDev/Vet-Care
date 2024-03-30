import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const deactivateServiceSchema = joi.object({
  id: joi.string().id().messages({
    "string.empty": "A valid id is required.",
    "string.required": "A valid id is required.",
  }),
});

const deactivateServiceValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await deactivateServiceSchema.validateAsync(req.params);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { deactivateServiceValidation };
