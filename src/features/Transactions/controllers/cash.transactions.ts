import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { statusCode } from "../../../utils/httpStatusCode";
import { getCurrentDateTime } from "../../../utils/currentDateAndTime";
import { globalError } from "../../../utils/globalError";
const { FAIL, SUCCESS } = statusCode;


const issueBillCash = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { service_id, owner_id, pet_id } = req.body;
    const today = getCurrentDateTime();
    const service = await prisma.services.findUnique({where: {id: Number(service_id)}});
    const pet = await prisma.pets.findUnique({where: {id: pet_id}});
    const owner = await prisma.owners?.findUnique({where: {id: owner_id as string}});
    if(!service) {
        const err = new globalError("No service found.", 404
        ,FAIL)
        return next(err);
    }

    if(owner?.id !== owner_id) {
        const err = new globalError("No owner found.", 404
        ,FAIL)
        return next(err);
    }

    if(!pet) {
        const err = new globalError("No pet found.", 404
        ,FAIL)
        return next(err);
    }

    if(pet.owner_id !== owner?.id) {
        const err = new globalError("Pet does not belong to owner.", 400
        ,FAIL)
        return next(err);
    }

    const save_bill = await prisma.transactions.create({
        data: {
            pet_id: pet.id,
            client_id: pet.owner_id,
            amount: service.price,
            service_name: service.type,
            date: today.date,
            time: today.time,
            payment_id: "",
            payment_method: "Cash",
        }
    });
    res.status(201).send({
        status: SUCCESS,
        message: "Bill succesfully issued.",
        data: null
    });
});

export { issueBillCash }
