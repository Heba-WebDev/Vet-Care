import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const staffDelete = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {id, exit_reason } = req.body;
    const token = req.decodedToken;
    if(token?.permission_type !== "Admin" || token?.job_title !== "HR") {
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
    }
    const user = await prisma.staff.findUnique({where: {id}});
    if (!user) {
        const err = new globalError("Invalid id.", 400
        ,FAIL)
        return next(err);
    }
    await prisma.formerStaff.create({
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            job_title: user.job_title,
            exit_date: new Date(),
           exit_reason: exit_reason
        }
    });
    await prisma.staff.delete({where: {id: user.id}});
    return res.status(204).send({
        status: SUCCESS,
        message: "Account successfully deleted.",
        data: null
    });
});

export { staffDelete }