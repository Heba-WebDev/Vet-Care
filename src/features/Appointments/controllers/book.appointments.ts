import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { SUCCESS, FAIL } = statusCode;

const bookAppointments = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { date, vet_id, owner_id, pet_id, service_id } = req.body;
    const vet = await prisma.veterinarians.findUnique({where: {id: vet_id}});
    const owner = await prisma.owners.findUnique({where: {id: owner_id}});
    const pet = await prisma.pets.findUnique({where: {id: pet_id}});
    const service = await prisma.services.findUnique({where: {id: service_id}});
    const holiday = await prisma.publicHolidays.findFirst({where: {date}});
    const weekend = new Date(date).getDay();
    if(!vet) {
        const err = new globalError("No vet found.", 404
        ,FAIL)
        return next(err);
    }

    if(!owner) {
        const err = new globalError("No owner found.", 404
        ,FAIL)
        return next(err);
    }

    if(!pet) {
        const err = new globalError("No pet found.", 404
        ,FAIL)
        return next(err);
    }
    if(!service) {
        const err = new globalError("No service found.", 404
        ,FAIL)
        return next(err);
    }
    if (holiday) {
        const err = new globalError("Can not book an appointment on a holiday.", 400
        ,FAIL)
        return next(err);
    }
    if(weekend === 0 || weekend === 6) {
        const err = new globalError("Can not book an appointment on a weekend.", 400
        ,FAIL)
        return next(err);
    }
    await prisma.appointments.create({
        data:{
            vet_id,
            owner_id,
            pet_id,
            date,
            service_id: service.id
        }
    }).then((result) => {
        res.status(201).send({
            status: SUCCESS,
            message: "Appointment succesfully created.",
            data: result
        })
    })

});

export { bookAppointments }