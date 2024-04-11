import { Request, Response, NextFunction} from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL, SUCCESS } = statusCode;

const addHoliday = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { name, date } = req.body;
    const date_no_time = new Date(date);
    date_no_time.setHours(0);
    date_no_time.setMinutes(0);
    date_no_time.setSeconds(0);
    date_no_time.setMilliseconds(0);
    const token = req.decodedToken;
    if((token?.job_title !== "HR" && token?.job_title !== "Manager") || token?.permission_type !== "Admin"){
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
    }
    const duplicated = await prisma.publicHolidays.findMany({
        where: {
            date: date_no_time
        }
    });
    if(duplicated) {
        const err = new globalError("Holiay already exists.", 400
        ,FAIL)
        return next(err);
    }
    const created_holiday = await prisma.publicHolidays.create({
        data: {
            name,
            date
        }
    });
    res.status(201).send({
            status: SUCCESS,
            message: "Holiday succesfully added.",
            data: created_holiday
        })
});

export { addHoliday }