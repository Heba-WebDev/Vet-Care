import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const staffVerify = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {email} = req.body;
    const token = req.decodedToken;
    if(token?.permission_type !== "Admin" || (token?.job_title !== "HR" && token?.job_title !== "Manager")) {
        const err = new globalError("Unauthorized to perform this action.", 401
        ,FAIL)
        return next(err);
    }
    const user = await prisma.staff.findUnique({where: {email}});
    if (!user) {
        const err = new globalError("Invalid user id.", 400
        ,FAIL)
        return next(err);
    }
    await prisma.staff.update({
       where:{id: user.id},
       data: {verified: true}
    });
    return res.status(200).send({
        status: SUCCESS,
        message: "Account has been sucessfully verified.",
        data: null
    });
});

export { staffVerify }