import { prisma } from "../../../config/prisma";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL } = statusCode;

const updateStaffAccount = async(id: string, email: string, password: string, phone_number: string) => {
    if(email) {
        await prisma.staff.update({
        where: {id},
        data: {
            email
        }
    });
    }
    if(password) {
        await prisma.staff.update({
        where: {id},
        data: {
            password
        }
    });
    }
    if(phone_number) {
        await prisma.staff.update({
        where: {id},
        data: {
            phone_number
        }
    });
    }
};

const updateStaffAccountByAdmin = async( id: string, email: string, password: string, phone_number: string, job_title: string) => {
    if(email) {
        await prisma.staff.update({
        where: {id},
        data: {
            email
        }
    });
    }
    if(password) {
        await prisma.staff.update({
        where: {id},
        data: {
            password
        }
    });
    }
    if(phone_number) {
        await prisma.staff.update({
        where: {id},
        data: {
            phone_number
        }
    });
    }
    if(job_title) {
        await prisma.staff.update({
        where: {id},
        data: {
            job_title
        }
    });
    }
};

export {
    updateStaffAccount,
    updateStaffAccountByAdmin
}