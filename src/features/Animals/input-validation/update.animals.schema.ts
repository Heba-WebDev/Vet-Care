import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
const {FAIL} = statusCode


const animalsUpdateSchema = joi.object({
    id: joi.string().id().required().messages({
    "string.empty": "An animal id is required.",
    "string.required": "An animal id is required.",
  }),
  type: joi.string().optional().messages({
    "string.empty": "An animal type is required.",
    "string.required": "An animal type is required.",
  }),
});

const animalsUpdateValidation = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await animalsUpdateSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { animalsUpdateValidation };
