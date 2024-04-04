import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { SUCCESS, FAIL } = statusCode;

const bookAppointments = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { date, vet_id, owner_id, pet_id, service_type } = req.body;
    const d = new Date(date);
    d.setMinutes(0);
    d.setSeconds(0);
    // const d_holiday = new Date(date);
    // d_holiday.setHours(0);
    // d_holiday.setMinutes(0);
    // d_holiday.setSeconds(0);
    const vet = await prisma.veterinarians.findUnique({where: {id: vet_id}});
    const vet_booked = await prisma.appointments.findFirst({where: {vet_id, date: d}})
    const owner = await prisma.owners.findUnique({where: {id: owner_id}});
    const pet = await prisma.pets.findUnique({where: {id: pet_id}});
    const service = await prisma.services.findUnique({where: {type: service_type}});
    const holiday = await prisma.publicHolidays.findFirst({where: {date: d}});
    if(!vet) {
        const err = new globalError("No vet found.", 404
        ,FAIL)
        return next(err);
    }

    if(vet_booked) {
        const err = new globalError("Vet booked for this date and hour.", 400
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
    if(d.getDay() === 0 || d.getDay() === 6) {
        const err = new globalError("Can not book an appointment on a weekend.", 400
        ,FAIL)
        return next(err);
    }
    if (d.getHours() < 8 || d.getHours() > 16) {
    const err = new globalError("Appointments are only available between 8:00 AM and 5:00 PM.", 400, FAIL);
    return next(err);
    }
    const appointment = await prisma.appointments.create({
        data:{
            vet_id,
            owner_id,
            pet_id,
            date: d,
            service_type: service.type
        }
    });
    return res.status(201).send({
            status: SUCCESS,
            message: "Appointment succesfully created.",
            data: appointment
        })

});

export { bookAppointments }