import { PrismaClient } from "@prisma/client";

export class PostgresDatabse {
    static async connect() {
        try {
            const prismaClient = new PrismaClient();
            console.log(`Database connected!!`);
            return prismaClient;
        }catch(error) {
            throw error;
        }
    }
}