import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { SUCCESS, FAIL } = statusCode;

const cancelAppointment = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const appointment = await prisma.appointments.findUnique({where: {id}});
    if (!appointment) {
        const err = new globalError("No appointment found.", 404
        ,FAIL)
        return next(err);
    }
    await prisma.appointments.delete({
        where: {id}
    }).then((result) => {
        res.status(204).send({
            status: SUCCESS,
            message: "Appointment succesfully cancelled.",
            data: null
        })
    });

});

export { cancelAppointment }