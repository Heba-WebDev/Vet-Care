import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL, SUCCESS } = statusCode;

const payBill = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const { transaction_id } = req.body;
    const transaction = await prisma.transactions.findUnique({where: {id: transaction_id}});

    if(!transaction) {
        const err = new globalError("No transaction found.", 404
        ,FAIL)
        return next(err);
    }

    const paid = await prisma.transactions.update({
        where: {
            id: transaction_id
        },
        data: {
            status: "Paid"
        }
    });

    res.status(200).send({
        status: SUCCESS,
        message: "Bill is succesfully paid.",
        data: null
    })
});

export { payBill }