import { prisma } from "../../../config/prisma";

const updateOwnerAccount = async(id: string, name:string, email: string, phone_number: string) => {
    if(email) {
        await prisma.owners.update({
        where: {id},
        data: {
            email
        }
    });
    }
    if(name) {
        await prisma.owners.update({
        where: {id},
        data: {
            name
        }
    });
    }
    if(phone_number) {
        await prisma.owners.update({
        where: {id},
        data: {
            phone_number
        }
    });
    }
};


export {
    updateOwnerAccount
}