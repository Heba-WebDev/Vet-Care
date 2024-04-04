import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const getAllVets = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 15; // Default 15 results per page
    const offset = (page - 1) * limit;
    if(id) {
        const vet = await prisma.veterinarians.findUnique({where: {id: id as string}});
        if(!vet){
        const err = new globalError("No vet found.", 404
        ,FAIL)
        return next(err);
        } else {
        const result = await prisma.staff.findMany({
        skip: offset,
        take: limit,
        where:{ id: id as string}
        });
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: result
        });
        }
    }
    const result = await prisma.veterinarians.findMany({
        skip: offset,
        take: limit,
    });
     return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: result
    });
});

export { getAllVets }