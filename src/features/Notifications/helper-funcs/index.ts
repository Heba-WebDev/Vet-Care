import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import { globalError } from "../../../utils/globalError";
import { createTransport } from "nodemailer";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL, SUCCESS } = statusCode;

interface notificaiton_details {
    email: string;
    day: string;
    time: string;
    owner_name: string;
    vet_name: string;
    pet_name: string;
}

const bookingNotification =  async(next: NextFunction, {email, day, time, owner_name, vet_name, pet_name}: notificaiton_details) => {

    const year: string = String(new Date().getFullYear());

    const htmlTemplate = fs.readFileSync(path.join(__dirname, '../../views/emails/booking.html'), 'utf8');
    const htmlContent = htmlTemplate
                        .replace('{owner_name}', owner_name)
                        .replace('{vet_name}', vet_name)
                        .replace(`{pet_name}`, pet_name)
                        .replace(`{type}`, "Booked")
                        .replace(`{date}`, day)
                        .replace(`{time}`, time)
                        .replace(`{year}`, year);
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
    to: email,
    subject: "Appointment Booking | VetCare",
    html : htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        const err = new globalError("An error happened while sending the email.", 500
        ,FAIL)
        return next(err);
    }
    });

};

const cancellingNotification =  async(next: NextFunction, {email, day, time, owner_name, vet_name, pet_name}: notificaiton_details) => {

    const year: string = String(new Date().getFullYear());

    const htmlTemplate = fs.readFileSync(path.join(__dirname, '../../views/emails/booking.html'), 'utf8');
    const htmlContent = htmlTemplate
                        .replace('{owner_name}', owner_name)
                        .replace('{vet_name}', vet_name)
                        .replace(`{pet_name}`, pet_name)
                        .replace(`{type}`, "Cancelled")
                        .replace(`{date}`, day)
                        .replace(`{time}`, time)
                        .replace(`{year}`, year);
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
    to: email,
    subject: "Appointment Booking | VetCare",
    html : htmlContent
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        const err = new globalError("An error happened while sending the email.", 500
        ,FAIL)
        return next(err);
    }
    });

};

export { bookingNotification, cancellingNotification }