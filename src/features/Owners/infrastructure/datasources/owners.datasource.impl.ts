import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../../data";
import { AllOwnersDatasourceResponse, GetAllOwnersDto, OwnerEntity, OwnersDatasource, RegisterOwnerDto } from "../../domain";
import { CustomError } from "../../../../domain";
import { OwnerMapper } from "../mapper";
import { logger } from "../../../../infrastructure";

export class OwnersDatasourceImpl implements OwnersDatasource {
    private readonly _prisma: PrismaClient;
    constructor(orm: any = prisma) {
        this._prisma = orm;
    }

    async register(ownersDto: RegisterOwnerDto): Promise<OwnerEntity | null> {
        const { name, email, phone_number } = ownersDto;
        try {
            const emailExists = await this._prisma.owners.findFirst({ where: { email }});
            if (emailExists) throw CustomError.badRequest('Email already exists');
            const numberExists = await this._prisma.owners.findFirst({ where: { phone_number }});
            if (numberExists) throw CustomError.badRequest('Phone number already exists');
            const owner = await this._prisma.owners.create({
                data: {
                    ...ownersDto
                }
            });
            return OwnerMapper.ownerEntityFromObject(owner);
        } catch(error) {
            logger.error(error);
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async getAll(ownerDto: GetAllOwnersDto): Promise<AllOwnersDatasourceResponse | null> {
        const { id, name, email, phone_number, page, limit } = ownerDto;
        try {
        const offset = (page! - 1) * limit!;
        const [totalOwners, owners] = await this._prisma.$transaction([
            this._prisma.owners.count({
                where: {
                    id: id!,
                    name: name!,
                    email: email!,
                    phone_number: phone_number!
                }
            }),
            this._prisma.owners.findMany({
                where: {
                    id: id!,
                    name: name!,
                    email: email!,
                    phone_number: phone_number!
                },
                skip: offset,
                take: limit
            })
        ]);

        const totalPages = Math.ceil(totalOwners / limit!);

        return {
            owners,
            currentPage: page!,
            totalPages
        };
        } catch(error) {
            logger.error(error);
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }
}
