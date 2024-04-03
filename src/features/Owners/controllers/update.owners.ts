import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { updateOwnerAccount } from "../helper-funcs";
const { SUCCESS, FAIL } = statusCode;

const updateOwner = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {id, email, name, phone_number } = req.body;
    const owner = await prisma.owners.findUnique({where: {id}});
    if(!owner) {
        const err = new globalError("No owner found.", 400
        ,FAIL)
        return next(err);
    }

    await updateOwnerAccount(id, name, email, phone_number);

    return res.status(200).send({
        status: SUCCESS,
        message: "Account has been sucessfully updated.",
        data: {
            id: owner?.id,
            name: name ? name : owner?.name,
            email: email? email : owner?.email,
            phone_number: phone_number ? phone_number: owner?.phone_number,
        },
    });
});

export { updateOwner }