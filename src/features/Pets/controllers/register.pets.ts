import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const petsRegistration = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { name,owner_id, type, gender } = req.body;
    const type_found = await prisma.animals.findFirst({where: {type}});
    if(!type_found) {
        const err = new globalError("Please provide a valid animal type [Cat, Dog, Horse, Bird, Snake, Lizard, Hamster, Rat].", 404
        ,FAIL);
        return next(err);
    }
    if(gender && gender !== "Female" && gender !== "Male") {
        const err = new globalError("Please provide a valid animal gender [Female, Male].", 404
        ,FAIL);
        return next(err);
    }
    const owner = await prisma.owners.findUnique({where: {id: owner_id}});
    if (!owner) {
        const err = new globalError("No owner found.", 404
        ,FAIL);
        return next(err);
    }
    const pet = await prisma.pets.create({
        data: {
            name,
            owner_id,
            type,
            gender
        }
    });
    return res.status(201).send({
        status: SUCCESS,
        message: "Pet profile is sucessfully created.",
        data: pet
    });
});

export { petsRegistration }