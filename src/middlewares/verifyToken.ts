import jwt from "jsonwebtoken";
import {  Request, Response, NextFunction } from "express";
import { globalError } from "../utils/globalError";
import { statusCode } from "../utils/httpStatusCode";
interface token {
  id: string,
  permission_type: string,
  job_title: string,
  iat: number,
  exp: number
}

const { FAIL } = statusCode;


const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.cookies['user'];
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
        const err = new globalError("Invalid token!", 401
        ,FAIL)
        return next(err);
    }

}

export { verifyToken }