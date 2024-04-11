import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import joi from "joi";
import { globalError } from "../../../utils/globalError";
const {FAIL} = statusCode


const addHolidaysSchema = joi.object({
  date: joi.date().required().messages({
    "date.empty": "A valid holiday date is required.",
    "date.required": "A valid holiday date is required.",
  }),
  name: joi
    .string()
    .required()
    .messages({
      "string.empty": "A valid holiday name is required.",
      "string.id": "A valid holiday name is required.",
    }),
});

const addHolidaysValidation = async (req: Request, res: Response, next: NextFunction) => {
  const dateStr = new Date(req.body.date).getTime();
  if(isNaN(dateStr)) {
    const err = new globalError("A valid date is required.", 400, FAIL);
    return next(err);
  }
  try {
    await addHolidaysSchema.validateAsync(req.body);
    next();
  } catch (error ) {
    if(error instanceof Error) {
      res.status(400).send({ status: FAIL, message: error?.message })
    }
  }
};

export { addHolidaysValidation };
