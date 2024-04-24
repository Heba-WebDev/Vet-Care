import { Request, Response, NextFunction } from "express";
import { stripe } from "../../../config/stripe";
import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { statusCode } from "../../../utils/httpStatusCode";
import { getCurrentDateTime } from "../../../utils/currentDateAndTime";
import { globalError } from "../../../utils/globalError";
import { createTransport } from "nodemailer";
import { pricesList } from "../helper-funcs";
const { FAIL, SUCCESS } = statusCode;


const sendCardBill = wrapper(async (req: Request, res: Response, next: NextFunction) => {
    const { service_id, owner_id, pet_id } = req.body;
    const today = getCurrentDateTime();
    const service = await prisma.services.findUnique({where: {id: Number(service_id)}});
    const pet = await prisma.pets.findUnique({where: {id: pet_id}});
    const owner = await prisma.owners?.findUnique({where: {id: owner_id as string}});
    const service_price = pricesList(service?.type as string);
    if(!service) {
        const err = new globalError("No service found.", 404
        ,FAIL)
        return next(err);
    }

    if(owner?.id !== owner_id) {
        const err = new globalError("No owner found.", 404
        ,FAIL)
        return next(err);
    }

    if(!pet) {
        const err = new globalError("No pet found.", 404
        ,FAIL)
        return next(err);
    }

    if(pet.owner_id !== owner?.id) {
        const err = new globalError("Pet does not belong to owner.", 400
        ,FAIL)
        return next(err);
    }

    if(!service_price) {
        const err = new globalError("A valid service is required.", 400
        ,FAIL)
        return next(err);
    }

    const bill = await stripe.checkout.sessions.create({
        success_url: `${process.env.HOST}/transactions`,
        cancel_url: `${process.env.HOST}/transactions`,
        currency: "USD",
        line_items: [
        {
        price: service_price,
        quantity: 1,
        },
        ],
        mode: 'payment',
    });
    const paymentID = bill.id;
    const paymentUrl = bill.url;
    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions = {
    from: process.env.EMAIL_USR,
    to: owner?.email,
    subject: "Service bill | VetCare",
    text: `Thank you for using our services! Your pet's bill for ${service} on ${new Date().getDate()} is $${service.price}$. Click here to pay: ${paymentUrl}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        const err = new globalError("An error happened while sending the email.", 500
        ,FAIL)
        return next(err);
    }
    });
    const save_bill = await prisma.transactions.create({
        data: {
            pet_id: pet.id,
            client_id: pet.owner_id,
            amount: service.price,
            service_name: service.type,
            date: today.date,
            time: today.time,
            payment_id: paymentID,
            payment_method: "Online"
        }
    });
    res.status(201).send({
        status: SUCCESS,
        message: "Bill succesfully sent to the owner's email.",
        data: null
    })
});

export { sendCardBill }