import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const allPetsOfAnOwner = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {id, phone_number} = req.params;
    const ownerByNumber = await prisma.owners.findFirst({where: {phone_number}});
    const ownerById = await prisma.owners.findUnique({where: {id}});
    if (!ownerByNumber && !ownerById) {
        const err = new globalError("No user found.", 404, FAIL);
        return next(err);
    }
    const pets = await prisma.pets.findMany({where: {owner_id: ownerByNumber?.id ? ownerByNumber.id : ownerById?.id}})
    return res.status(200).send({
    status: SUCCESS,
    message: null,
    data: pets
    });
});

export { allPetsOfAnOwner }