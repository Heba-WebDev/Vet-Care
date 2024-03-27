import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const staffRegistration = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password, phone_number, job_title } = req.body;
    const job = await prisma.jobs.findFirst({where: {title: job_title}});
    if (!job) {
        const err = new globalError("Please provide a valid job title [Receptionist, HR, or Manager].", 400
        ,FAIL)
        return next(err);
    }
    const emailFound = await prisma.staff.findUnique({where: {email}});
    if (emailFound) {
        const err = new globalError("Email already exists.", 400
        ,FAIL)
        return next(err);
    }
    const hashedPassword = await hash(password, 10);
    await prisma.staff.create({
        data: {
            name,
            job_title,
            email,
            password: hashedPassword,
            phone_number
        }
    })
    return res.status(201).send({
        status: SUCCESS,
        message: "Account has been sucessfully created.",
        data: null
    });
});

export { staffRegistration }