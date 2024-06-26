import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const getAllStaff = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.query;
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 15; // Default 15 results per page
    const offset = (page - 1) * limit;
    if(email) {
        const user = await prisma.staff.findFirst({where: {email: email as string}});
        if(!user){
        const err = new globalError("No staff found.", 404
        ,FAIL)
        return next(err);
        } else {
        const result = await prisma.staff.findMany({
        skip: offset,
        take: limit,
        where:{ email: email as string}
        });
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: result
        });
        }
    }
    const all_current_staff = await prisma.staff.findMany({
        skip: offset,
        take: limit,
    });
    return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: all_current_staff
    });
});

export { getAllStaff }