import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
import { cancellingNotification } from "../../Notifications/helper-funcs";
const { SUCCESS, FAIL } = statusCode;

const cancelAppointment = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const appointment = await prisma.appointments.findFirst({where: {id}});
    if (!appointment) {
        const err = new globalError("No appointment found.", 404
        ,FAIL)
        return next(err);
    }
    const owner = await prisma.owners.findUnique({where: {id: appointment.owner_id}});
    const pet = await prisma.pets.findUnique({where: {id: appointment.pet_id}});
    const vet = await prisma.veterinarians.findUnique({where: {id: appointment.vet_id}});
    await prisma.appointments.delete({
        where: {id}
    });
    // await cancellingNotification(next, {email: owner?.email as string, owner_name: owner?.name as string, vet_name: vet?.name as string, pet_name: pet?.name as string, time: appointment.time, day: appointment.date
    // });
    res.status(204).send({
            status: SUCCESS,
            message: "Appointment succesfully cancelled.",
            data: null
        })

});

export { cancelAppointment }