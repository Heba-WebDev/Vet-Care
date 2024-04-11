import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
import { globalError } from "../../../utils/globalError";
const {FAIL} = statusCode


const removeHolidaysSchema = joi.object({
  id: joi.number().id().required().messages({
    "number.empty": "A valid holiday id is required.",
    "number.required": "A valid holiday id is required.",
  }),
});

const removeHolidaysValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await removeHolidaysSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { removeHolidaysValidation };
