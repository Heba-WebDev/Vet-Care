import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { updateStaffAccount, updateStaffAccountByAdmin } from "../helper-funcs";
const { SUCCESS, FAIL } = statusCode;

const staffUpdate = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {id, email, password, phone_number, job_title } = req.body;
    const token = req.decodedToken;
    const staff_member = await prisma.staff.findUnique({where: {id}});
    if(!staff_member) {
        const err = new globalError("No staff found.", 400
        ,FAIL)
        return next(err);
    }
    if(token?.id === id) {
        if(job_title) {
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
        }
        await updateStaffAccount(id, email, password, phone_number);
    }

    if(token?.id !== id && (token?.permission_type === "Admin" || (token?.job_title === "HR" || token?.job_title === "Manager"))) {
        if(job_title) {
            const job = await prisma.jobs.findFirst({where: {title: job_title}});
            if(!job) {
                const err = new globalError("Please provide a valid job title [Veterinarian, Asistant or Technician].", 400
                ,FAIL)
                return next(err);
            }
        }
        await updateStaffAccountByAdmin(id, email, password, phone_number, job_title);
    }

    return res.status(200).send({
        status: SUCCESS,
        message: "Account has been sucessfully updated.",
        data: {
            id: staff_member?.id,
            email: email? email : staff_member?.email,
            phone_number: phone_number ? phone_number: staff_member?.phone_number,
            job_title: job_title ? job_title : staff_member?.job_title,
            permission_type: staff_member?.permission_type,
            verified: staff_member?.verified
        },
    });
});

export { staffUpdate }