import { prisma } from "../../../config/prisma";
import { wrapper } from "../../../middlewares/asyncWrapper";
import { globalError } from "../../../utils/globalError";
import { statusCode } from "../../../utils/httpStatusCode";
const { FAIL } = statusCode;

const updateVetAccount = async(id: string, email: string, password: string, phone_number: string) => {
    if(email) {
        await prisma.veterinarians.update({
        where: {id},
        data: {
            email
        }
    });
    }
    if(password) {
        await prisma.veterinarians.update({
        where: {id},
        data: {
            password
        }
    });
    }
    if(phone_number) {
        await prisma.veterinarians.update({
        where: {id},
        data: {
            phone_number
        }
    });
    }
};

const updateVetAccountByAdmin = async( id: string, email: string, password: string, phone_number: string, job_title: string) => {
    if(email) {
        await prisma.veterinarians.update({
        where: {id},
        data: {
            email
        }
    });
    }
    if(password) {
        await prisma.veterinarians.update({
        where: {id},
        data: {
            password
        }
    });
    }
    if(phone_number) {
        await prisma.veterinarians.update({
        where: {id},
        data: {
            phone_number
        }
    });
    }
    if(job_title) {
        await prisma.veterinarians.update({
        where: {id},
        data: {
            job_title
        }
    });
    }
};

export {
    updateVetAccount,
    updateVetAccountByAdmin
}