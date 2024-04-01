import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const getAllOwners = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {phone_number, email} = req.query;
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 15; // Default 15 results per page
    const offset = (page - 1) * limit;
    const ownerByEmail = await prisma.owners.findFirst({where: {email: email as string}});
    const ownerByNumber = await prisma.owners.findFirst({where: {phone_number: phone_number as string}});
    if(ownerByEmail) {
        const owner = await prisma.owners.findMany({
        skip: offset,
        take: limit,
        where: {email: email as string}
        });
        if(!owner) {
        const err = new globalError("No owner found.", 404
        ,FAIL)
        return next(err);
        }
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: owner
        });
    }
    if(ownerByNumber) {
        const owner = await prisma.owners.findMany({
        skip: offset,
        take: limit,
        where: {phone_number: phone_number as string}
        });
        if(!owner) {
        const err = new globalError("No owner found.", 404
        ,FAIL)
        return next(err);
        }
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: owner
        });
    }
    await prisma.owners.findMany({
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

export { getAllOwners }