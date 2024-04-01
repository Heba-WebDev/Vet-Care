import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { updateVetAccount, updateVetAccountByAdmin } from "../helper-funcs";
const { SUCCESS, FAIL } = statusCode;

const vetsUpdate = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {id, email, password, phone_number, job_title } = req.body;
    const token = req.decodedToken;
    const vet = await prisma.veterinarians.findUnique({where: {id}});
    if(!vet) {
        const err = new globalError("No vet found.", 400
        ,FAIL)
        return next(err);
    }
    if(token?.id === id) {
        if(job_title) {
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
        }
        await updateVetAccount(id, email, password, phone_number);
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
        await updateVetAccountByAdmin(id, email, password, phone_number, job_title);
    }

    return res.status(200).send({
        status: SUCCESS,
        message: "Account has been sucessfully updated.",
        data: {
            id: vet?.id,
            email: email? email : vet?.email,
            phone_number: phone_number ? phone_number: vet?.phone_number,
            job_title: job_title ? job_title : vet?.job_title,
            permission_type: vet?.permission_type,
            verified: vet?.verified
        },
    });
});

export { vetsUpdate }