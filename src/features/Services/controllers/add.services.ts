import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { SUCCESS, FAIL } = statusCode;

const addService = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { type, price } = req.body;
    const token = req.decodedToken;
    if(token?.permission_type !== "Admin" || token?.job_title !== "Manager") {
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
    }
    const s = await prisma.services.findFirst({where: {type}});
    if (s) {
        const err = new globalError("Service already exists.", 400
        ,FAIL)
        return next(err);
    }
    const service = await prisma.services.create({
        data: {
            type,
            price
        }
    });

    return res.status(201).send({
        status: SUCCESS,
        message: "Service scuessfully added.",
        data: service
    });

});

export { addService }