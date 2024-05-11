import { Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { generateJwt } from "../../../utils/generateJWT";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { expirationDate } from "../../../utils/generateExpirationDate";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const staffLogin = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {email, password } = req.body;

    const user = await prisma.staff.findUnique({where: {email}});
    if (!user) {
        const err = new globalError("Invalid credentials.", 401
        ,FAIL)
        return next(err);
    }
    const matchedPassword = await compare(password, user.password!);
    if (!matchedPassword) {
    const err = new globalError("Invalid Credentials.", 401
    ,FAIL)
    return next(err);
    }
    if(!user.verified) {
        res.status(401).send({
        status: FAIL,
        message: "This accout is yet to be verified.",
        data: null
    });
    }
    const token = await generateJwt({id: user.id, permission_type: user.permission_type, job_title: user.job_title});
    res.cookie('user', token, {expires:expirationDate, httpOnly: false});
    return res.status(200).send({
        status: SUCCESS,
        message: "User sucessfully logged in.",
        data: {
            id: user.id,
            email: user.email,
            job_title: user.job_title,
            permission_type: user.permission_type,
            verified: user.verified
        }
    });
});

export { staffLogin }