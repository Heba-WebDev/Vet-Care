import { Request, Response, NextFunction } from "express";
import { statusCode } from "../../../utils/httpStatusCode";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
const { SUCCESS, FAIL } = statusCode;

const getOwnerByName = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const {name} = req.params;
    const user = await prisma.owners.findMany({where: {name: {
        contains: name as string
    }}})

    if (!user) {
        const err = new globalError("No user found.", 400, FAIL);
        return next(err);
    }

    return res.status(200).send({
    status: SUCCESS,
    message: null,
    data: user
    });
});

export { getOwnerByName }