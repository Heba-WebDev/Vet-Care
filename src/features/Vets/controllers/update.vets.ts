import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const vetsUpdate = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {id, email, password, phone_number, job_title } = req.body;
    if(!email && !password && !phone_number && !job_title) {
        const err = new globalError("An email, a password or a phone number is required to update an account.", 404
        ,FAIL)
        return next(err);
    }
    const token = req.decodedToken;
    if((token?.id !== id && token?.permission_type !== "Admin") || (token?.id !== id && token?.job_title !== "HR")) {
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
    }
    const user = await prisma.veterinarians.findUnique({where: {id}});
    if (!user) {
        const err = new globalError("Invalid credentials.", 401
        ,FAIL)
        return next(err);
    }
    if (password) {
        await prisma.veterinarians.update({
            where: {id},
            data: {password}
        })
    }
    if (email) {
        await prisma.veterinarians.update({
            where: {id},
            data: {email}
        })
    }
    if (phone_number) {
        await prisma.veterinarians.update({
            where: {id},
            data: {phone_number}
        })
    }
    if((token?.permission_type === "Admin" || token?.job_title === "HR") && job_title) {
        const job = await prisma.jobs.findFirst({where: {title: job_title}});
        if (!job) {
        const err = new globalError("Please provide a valid job title [Veterinarian, Asistant or Technician].", 400
        ,FAIL)
        return next(err);
        } else {
            await prisma.veterinarians.update({
                where: {id},
                data:{job_title}
            })
        }
    }
    return res.status(200).send({
        status: SUCCESS,
        message: "Account has been sucessfully updated.",
        data: {
            id: user.id,
            email: email? email : user.email,
            phone_number: phone_number ? phone_number: user.phone_number,
            job_title: job_title ? job_title : user.job_title,
            permission_type: user.permission_type,
            verified: user.verified
        },
    });
});

export { vetsUpdate }