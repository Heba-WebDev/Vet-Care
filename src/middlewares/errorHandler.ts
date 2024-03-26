import { Request, Response, NextFunction } from "express";
import { CustomError } from "../interfaces/customError";
import { statusCode } from "../utils/httpStatusCode";
const { ERROR } = statusCode;

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction): void => {
    res.status(error?.statusCode || 500).send({status: ERROR, message: error.message})
}

export { errorHandler }