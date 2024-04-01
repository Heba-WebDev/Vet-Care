import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;
type Animal = {};
const getAllPets = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { id, type, owner_id, owner_phone_number, owner_email } = req.query;
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 15; // Default 15 results per page
    const offset = (page - 1) * limit;
    if(id) {
        const pet = await prisma.pets.findUnique({where: {id: id as string}});
        if(!pet) {
            const err = new globalError("No pet found.", 404
            ,FAIL)
            return next(err);
        }
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: pet
        });
    }
    if(type) {
         const pet = await prisma.pets.findMany({where: {type: type as Animal}});
        if(!pet) {
            const err = new globalError("No pet found.", 404
            ,FAIL)
            return next(err);
        }else {

        }
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: pet
        });
    }
    if(owner_id) {
        const owner = await prisma.owners.findUnique({where: {id: owner_id as string}});
        if(!owner) {
        const err = new globalError("No owner found.", 404
        ,FAIL)
        return next(err);
        }
        const pets = await prisma.pets.findMany({
        skip: offset,
        take: limit,
        where: {owner_id: owner.id as string}
        });
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: pets
        });
    }
    if(owner_email) {
        const owner = await prisma.owners.findFirst({where: {email: owner_email as string}});
        if(!owner) {
        const err = new globalError("No owner found.", 404
        ,FAIL)
        return next(err);
        }
        const pets = await prisma.pets.findMany({
        skip: offset,
        take: limit,
        where: {owner_id: owner.id as string}
        });
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: pets
        });
    }
    if(owner_phone_number) {
        const owner = await prisma.owners.findFirst({where: {phone_number: owner_phone_number as string}});
        if(!owner) {
        const err = new globalError("No owner found.", 404
        ,FAIL)
        return next(err);
        }
        const pets = await prisma.pets.findMany({
        skip: offset,
        take: limit,
        where: {owner_id: owner.id as string}
        });
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: pets
        });
    }
    const pets = await prisma.pets.findMany({
        skip: offset,
        take: limit,
    });
    return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: pets
    });
});

export { getAllPets }