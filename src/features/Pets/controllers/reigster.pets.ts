import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const petsRegistration = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { name,owner_id } = req.body;
    const owner = await prisma.owners.findUnique({where: {id: owner_id}});
    if (!owner) {
        const err = new globalError("No owner found.", 404
        ,FAIL);
        return next(err);
    }
    const pet = await prisma.pets.create({
        data: {
            name,
            owner_id
        }
    });
    return res.status(201).send({
        status: SUCCESS,
        message: "Pet profile is sucessfully created.",
        data: pet
    });
});

export { petsRegistration }