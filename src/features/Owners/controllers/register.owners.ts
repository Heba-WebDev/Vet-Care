import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { SUCCESS, FAIL } = statusCode;

const registerOwner = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { name, email, phone_number } = req.body;
    const number = await prisma.owners.findFirst({where: {phone_number}});
    if(number) {
        const err = new globalError("Phone number already exists.", 400
        ,FAIL)
        return next(err);
    }
    const email_found = await prisma.owners.findFirst({where: {email}});
    if(email_found) {
        const err = new globalError("Email already exists.", 400
        ,FAIL)
        return next(err);
    }
    await prisma.owners.create({
        data: {
            name,
            email,
            phone_number
        }
    }).then((result) => {
        return res.status(201).send({
            status: SUCCESS,
            message: "Owner successfully created.",
            data: result
        })
    });
});

export { registerOwner }