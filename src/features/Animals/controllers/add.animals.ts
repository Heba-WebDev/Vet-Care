import { Request, Response, NextFunction} from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { statusCode } from "../../../utils/httpStatusCode";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const addAnimals = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const {type} = req.body;
    const token = req.decodedToken;
    if(token?.permission_type !== "Admin" || (token?.job_title !== "HR" && token?.job_title !== "Manager")) {
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
    }
    const animal = await prisma.animals.findFirst({where: {type}});
    if (animal) {
        const err = new globalError("Animal type alreadye exist.", 400
        ,FAIL)
        return next(err);
    }
    const create_animal = await prisma.animals.create({
        data: {
            type
        }
    });
    return res.status(201).send({
            status: SUCCESS,
            message: "Animal type sucesffully added.",
            data: create_animal
        });
});

export { addAnimals }