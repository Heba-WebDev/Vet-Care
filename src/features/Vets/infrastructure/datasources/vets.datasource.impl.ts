import { VetEntity } from "../../domain/entities";
import { DeleteVetsDto, LoginVetsDto, RegisterVetsDto, VerifyVetDto } from "../../domain";
import { VetsDatasource } from "../../domain/datasources/vets.datasource";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../../data";
import { CustomError } from "../../../../domain";
import { bcryptAdapter, JwtAdapter } from "../../../../config";
import { VetMapper } from "../mappers/vet.mapper";
import { FormerVetEntity } from "../../domain/entities/former-vet.entity";


export class VetsDatasourceImpl implements VetsDatasource {
    private readonly _prisma: PrismaClient;
    constructor(orm: any = prisma) {
        this._prisma = orm;
    }

    async register(vetsDto: RegisterVetsDto): Promise<VetEntity | null> {
        const { name, email, password, phone_number, job_title } = vetsDto;
        try {
            const exists = await this._prisma.veterinarians.findFirst({ where: { email }});
            if (exists) throw CustomError.badRequest('Provide a different email');
            const phoneExists = await this._prisma.veterinarians.findFirst({where: {phone_number}});
            if (phoneExists) throw CustomError.badRequest('Provide a different phone number');
            const job = await this._prisma.jobs.findFirst({where: {title: job_title}});
            if (!job) throw CustomError.badRequest('Provide a valid job title [Veterinarian, Asistant or Technician]');
            const hashedPassword = bcryptAdapter.hash(password);
            const vet = await this._prisma.veterinarians.create({
                data: {
                     name, email, password: hashedPassword, phone_number, job_title
                }
            });
            return VetMapper.vetEntityFromObject(vet);
        } catch(error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async verify(vetsDto: VerifyVetDto): Promise<VetEntity | null> {
        const { email } = vetsDto;
        try {
            const exists = await this._prisma.veterinarians.findFirst({ where: { email }});
            if (!exists) throw CustomError.badRequest('No vet found');
            if (exists.verified) throw CustomError.badRequest('Vet member already verified');
            const vet = await this._prisma.veterinarians.update({
                where: { email },
                data: { verified: true }
            });
            return VetMapper.vetEntityFromObject(vet!);
        }catch(error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async login(vetsDto: LoginVetsDto): Promise<VetEntity | null> {
        const { email, password } = vetsDto;
        try {
            const exists = await this._prisma.veterinarians.findFirst({ where: { email } });
            if (!exists) throw CustomError.badRequest('Invalid credentials');
            if (!exists.verified) throw CustomError.unauthorized('Account has to be verified');
            const passwordMatch = await bcryptAdapter.compare(password, exists.password);
            if (!passwordMatch) throw CustomError.badRequest('Invalid credentials');
            return VetMapper.vetEntityFromObject(exists);
        }catch(error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async delete(vetsDto: DeleteVetsDto): Promise<VetEntity | null> {
        const { id, exit_reason } = vetsDto;
        return this._prisma.$transaction(async (prisma) => {
        const vet = await prisma.veterinarians.findFirst({ where: { id } });
        if (!vet) throw CustomError.badRequest('Invalid credentials');
        // Only verified vets are moved to the formerVets table
        if (vet.verified) {
            const formerVet = new FormerVetEntity(
            vet.id,
            vet.name,
            vet.email,
            vet.phone_number,
            vet.job_title,
            new Date(),
            exit_reason
        );
        await prisma.formerVets.create({ data: formerVet });
        }
        // verified and unverified accounts can be safely deleted
        await prisma.veterinarians.delete({ where: { id } });

        return VetMapper.vetEntityFromObject(vet);
        }).catch(error => {
        console.log(error);
        if (error instanceof CustomError) throw error;
        throw CustomError.internalServerError();
        });
    }
}