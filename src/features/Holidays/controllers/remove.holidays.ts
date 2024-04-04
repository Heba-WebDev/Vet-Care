import { Request, Response, NextFunction} from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL, SUCCESS } = statusCode;

const removeHoliday = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const token = req.decodedToken;
    if((token?.job_title !== "HR" && token?.job_title !== "Manager") || token?.permission_type !== "Admin"){
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
    }
    const deleted_holiday = await prisma.publicHolidays.delete({
        where: {id}
    });
    return res.status(204).send({
            status: SUCCESS,
            message: "Holiday succesfully deleted.",
            data: deleted_holiday
        })
});

export { removeHoliday }