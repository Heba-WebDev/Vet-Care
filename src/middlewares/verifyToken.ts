import jwt from "jsonwebtoken";
import {  Request, Response, NextFunction } from "express";
import { globalError } from "../utils/globalError";
import { statusCode } from "../utils/httpStatusCode";
interface token {
  id: string,
  permission_type: string,
  iat: number,
  exp: number
}

const { FAIL } = statusCode;


const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["Authorization"] || req.headers["authorization"];
    if (!authHeader) {
        const err = new globalError("Token is required.", 401
        ,FAIL)
        return next(err);
    }
    const token = authHeader;
    try {
        const decodedToken = await jwt.verify(token as string, process.env.JWT_SECRET_KEY as string);
        req.decodedToken = decodedToken as token;
        next();
    }catch(error) {
        const err = new globalError("Something went wrong!", 500
        ,FAIL)
        return next(err);
    }

}

export { verifyToken }