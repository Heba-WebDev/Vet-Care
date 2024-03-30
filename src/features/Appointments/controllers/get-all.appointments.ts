import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const getAllAppointments = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {vet_id} = req.params;
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 15; // Default 15 results per page
    const offset = (page - 1) * limit;
    if ( vet_id) {
        const vet = await prisma.veterinarians.findUnique({where: {id: vet_id}});
        if (!vet) {
        const err = new globalError("No veterinarian found.", 404
        ,FAIL)
        return next(err);
        }
        await prisma.appointments.findMany({
        skip: offset,
        take: limit,
        where:{ vet_id}
        }).then((result) => {
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: result
        });
        });
    }
    await prisma.appointments.findMany({
        skip: offset,
        take: limit,
    }).then((result) => {
        return res.status(200).send({
        status: SUCCESS,
        message: null,
        data: result
    });
    });
});

export { getAllAppointments }