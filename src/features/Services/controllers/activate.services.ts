import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { SUCCESS, FAIL } = statusCode;

const activateService = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const token = req.decodedToken;
    if(token?.permission_type !== "Admin") {
         const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
    }
    const service = await prisma.services.findUnique({
        where: {id}
    });
    if(!service) {
        const err = new globalError("No service found.", 404
        ,FAIL)
        return next(err);
    }
    await prisma.services.update({
        where: {id},
        data: {active: true}
    });

    return res.status(200).send({
        status: SUCCESS,
        message: "Service scuessfully deactivated.",
        data: null
    });

});

export { activateService }