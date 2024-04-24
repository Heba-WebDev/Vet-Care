import { Request, Response, NextFunction } from "express";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { prisma } from "../../../config/prisma";
import {stripe} from "../../../config/stripe";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL, SUCCESS } = statusCode;

const webhook = wrapper(async(req: Request, res: Response, next: NextFunction) => {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_ENDPOINT_SECRET as string);
    const paymentIntentId = event.data.object;
    // to be implmented in production
});


export { webhook }