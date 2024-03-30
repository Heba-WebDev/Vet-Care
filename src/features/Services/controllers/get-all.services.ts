import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
const { SUCCESS, FAIL } = statusCode;

const getAllServices = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 15; // Default 15 results per page
    const offset = (page - 1) * limit;
    await prisma.services.findMany({
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

export { getAllServices }