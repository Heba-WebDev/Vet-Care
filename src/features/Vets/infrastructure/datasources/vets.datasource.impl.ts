import { VetEntity } from "../../domain/entities";
import { DeleteVetsDto, GetAllVetsDto, LoginVetsDto, RegisterVetsDto, UpdateVetsDto, VerifyVetDto } from "../../domain";
import { VetsDatasource } from "../../domain/datasources/vets.datasource";
import { Prisma, PrismaClient } from "@prisma/client";
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

    async update(vetsDto: UpdateVetsDto): Promise<VetEntity | null> {
        const { id, email, password, phone_number } = vetsDto;
        try {
            const exists = await this._prisma.veterinarians.findFirst({ where: { id } });
            if (!exists) throw CustomError.badRequest('Invalid credentials');
            if (!exists.verified) throw CustomError.unauthorized('Account has to be verified');

            /*
            VetsUpdateInput ensures that you only update fields that exist in
            the Veterinarians model and that the values you provide are of the correct type.
            Rerelated records can be updated as well.
            */
            const data: Prisma.VeterinariansUpdateInput = {};

            if (email) data.email = email;
            if (phone_number) data.phone_number = phone_number;
            if (password) {
                data.password = await bcryptAdapter.hash(password);
            }

            // Only update if there's something to update
            if (Object.keys(data).length > 0) {
                await this._prisma.veterinarians.update({
                    data,
                    where: { id },
                });
            }

            const vet = await this._prisma.veterinarians.findFirst({ where: { id } });
                return VetMapper.vetEntityFromObject(vet!);
        } catch (error) {
                console.log(error);
                if (error instanceof CustomError) throw error;
                    throw CustomError.internalServerError();
            }
    }

    async getAll(vetsDto: GetAllVetsDto): Promise<VetEntity[] | null> {
        const { page, limit } = vetsDto;
        try {
           const offset = (page! - 1) * limit!;
            const vets = await this._prisma.veterinarians.findMany({
            skip: offset,
            take: limit,
            select: {
                id: true,
                name: true,
                email: true,
                job_title: true,
                permission_type: true,
                phone_number: true,
                verified: true,
            }
            });
            return vets;
        } catch (error) {
            console.log(error);
                if (error instanceof CustomError) throw error;
                throw CustomError.internalServerError();
        }
    }

    async GetAllFormer(vetsDto: GetAllVetsDto): Promise<FormerVetEntity[] | null> {
        const { page, limit } = vetsDto;
        try {
           const offset = (page! - 1) * limit!;
            const formerVets = await this._prisma.formerVets.findMany({
            skip: offset,
            take: limit
        });
            return formerVets;
        } catch (error) {
            console.log(error);
                if (error instanceof CustomError) throw error;
                throw CustomError.internalServerError();
        }
    }
}