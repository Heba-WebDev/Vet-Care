import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { bookingNotification } from "../../Notifications/helper-funcs";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
import { time } from "console";
const { SUCCESS, FAIL } = statusCode;

const bookAppointments = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { date, time, vet_id, owner_id, pet_id, service_type } = req.body;
    const _date = new Date(date);
    const vet = await prisma.veterinarians.findUnique({where: {id: vet_id}});
    const vet_booked = await prisma.appointments.findFirst({where: {vet_id, date, time}});
    const owner = await prisma.owners.findUnique({where: {id: owner_id}});
    const pet = await prisma.pets.findUnique({where: {id: pet_id}});
    const service = await prisma.services.findUnique({where: {type: service_type}});
    const holiday = await prisma.publicHolidays.findFirst({where: {date}});
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
    if(_date.getDay() === 0 || _date.getDay() === 6) {
        const err = new globalError("Can not book an appointment on a weekend.", 400
        ,FAIL)
        return next(err);
    }
    if(_date < new Date()) {
        const err = new globalError("Appointments can be booked in the past.", 400
        ,FAIL)
        return next(err);
    }
    const appointment = await prisma.appointments.create({
        data:{
            vet_id,
            owner_id,
            pet_id,
            date: date,
            time,
            service_type: service.type
        }
    });
    // await bookingNotification(next, {email: owner.email, owner_name: owner.name, vet_name: vet.name, pet_name: pet.name, time: time, day: date
    // });
    return res.status(201).send({
            status: SUCCESS,
            message: "Appointment succesfully created.",
            data: appointment
        });

});

export { bookAppointments }