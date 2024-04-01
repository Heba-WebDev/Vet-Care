import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const updatePet = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, type, gender } = req.body;
    const pet = await prisma.pets.findUnique({where: {id}});
    if(!pet) {
        const err = new globalError("No pet found.", 404
        ,FAIL);
        return next(err);
    }
    const valid_type = await prisma.animals.findFirst({where: {type}});
    if(!valid_type) {
        const err = new globalError("Please provide a valid animal type [Cat, Dog, Horse, Bird, Snake, Lizard, Hamster, Rat].", 400, FAIL);
        return next(err);
    }
    if(gender && gender !== "Female" && gender !== "Male") {
        const err = new globalError("Please provide a valid animal gender [Female, Male].", 404
        ,FAIL);
        return next(err);
    }
    if(name) {
        await prisma.pets.update({
            where: {id},
            data: {name}
        })
    }
    if(type) {
        await prisma.pets.update({
            where: {id},
            data: {type}
        })
    }
    if(gender) {
        await prisma.pets.update({
            where: {id},
            data: {gender}
        })
    }
    return res.status(200).send({
        status: SUCCESS,
        message: "Pet profile is sucessfully updated.",
        data: {
            id: id,
            name: name ? name : pet.name,
            type: type ? type : pet.type,
            gender: gender ? gender : pet.gender,
            owner_id: pet.owner_id
        }
    });
});

export { updatePet }