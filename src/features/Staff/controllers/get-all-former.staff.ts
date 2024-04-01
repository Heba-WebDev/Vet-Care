import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const getAllFormerStaff = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.decodedToken;
    if(token?.permission_type !== "Admin" && token?.job_title !== "HR") {
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
    }
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 15; // Default 15 results per page
    const offset = (page - 1) * limit;
    await prisma.formerStaff.findMany({
        skip: offset,
        take: limit,
    }).then((result) => {
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: result
    });
    });
});

export { getAllFormerStaff }