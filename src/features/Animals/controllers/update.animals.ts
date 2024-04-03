import { Request, Response, NextFunction } from "express";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { prisma } from "../../../config/prisma";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL, SUCCESS } = statusCode;

const updateAnimal = wrapper(async( req: Request, res: Response, next: NextFunction) => {
    const {id , type } = req.body;
    const token = req.decodedToken;
    if(token?.permission_type !== "Admin" || (token?.job_title !== "HR" && token?.job_title !== "Manager")) {
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
    }
    const animal = await prisma.animals.findFirst({where: {id}});
    if(!animal) {
        const err = new globalError("No animal found.", 404, FAIL);
        return next(err);
    }
    await prisma.animals.update({
        where: {id},
        data: {type}
    }).then((result) => {
        return res.status(200).send({
            status: SUCCESS,
            message: "Animal's type succesfully updated.",
            data: result
        });
    });
});

export { updateAnimal }
