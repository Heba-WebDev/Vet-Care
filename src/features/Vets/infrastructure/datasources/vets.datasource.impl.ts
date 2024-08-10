import { VetEntity } from "../../domain/entities";
import { LoginVetsDto, RegisterVetsDto, VerifyVetDto } from "../../domain";
import { VetsDatasource } from "../../domain/datasources/vets.datasource";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../../data";
import { CustomError } from "../../../../domain";
import { bcryptAdapter, JwtAdapter } from "../../../../config";
import { VetMapper } from "../mappers/vet.mapper";


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
}