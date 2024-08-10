import { PrismaClient } from "@prisma/client";
import { bcryptAdapter } from "../../../../config";
import { prisma } from "../../../../data";
import { CustomError } from "../../../../domain";
import {
    LoginStaffDto,
    RegisterStaffDto,
    StaffDatasource,
    VerifyStaffDto,
    DeleteStaffDto,
    GetAllStaffDto,
    UpdateStaffDto
} from "../../domain";
import { StaffEntity } from "../../domain/entities";
import { FormerStaffEntity } from "../../domain/entities/former-staff.entity";
import { StaffMapper } from "../mapper";


export class StaffDatasourceImpl implements StaffDatasource {
    private readonly _prisma: PrismaClient;
    constructor(orm: any = prisma) {
        this._prisma = orm;
    }
    async register(staffDto: RegisterStaffDto): Promise<StaffEntity | null> {
        const { name, email, password, phone_number, job_title } = staffDto;
        try {
            const exists = await this._prisma.staff.findFirst({where: { email }});
            if (exists) throw CustomError.badRequest('Provide a different email');
            const job = await this._prisma.jobs.findFirst({where: {title: job_title}});
            if (!job) throw CustomError.badRequest('Provide a valid job title [Receptionist, HR, or Manager]');
            const phoneExists = await this._prisma.staff.findFirst({where: {phone_number}});
            if (phoneExists) throw CustomError.badRequest('Provide a different phone number');
            const hashedPassword = bcryptAdapter.hash(password);

            const staff = await this._prisma.staff.create({
                data: {
                    name, email, password: hashedPassword, phone_number, job_title
                }
            });
            return StaffMapper.staffEntityFromObject(staff);

        }catch(error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async login(staffDto: LoginStaffDto): Promise<StaffEntity | null> {
        const { email, password } = staffDto;
        try {
            const exists = await this._prisma.staff.findFirst({where: { email }});
            if (!exists) throw CustomError.badRequest('Invalid credentials');
            if (!exists.verified) throw CustomError.unauthorized('Account has to be verified');
            const passwordMatch = bcryptAdapter.compare(password, exists.password!);
            if (!passwordMatch) throw CustomError.badRequest('Invalid credentials');
            const staff = await this._prisma.staff.findFirst({
                where: {
                    email
                }
            });
            return StaffMapper.staffEntityFromObject(staff!);

        }catch(error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async verify(staffDto: VerifyStaffDto): Promise<StaffEntity | null> {
        const { email } = staffDto;
        try {
            const exists = await this._prisma.staff.findFirst({where: { email }});
            if (!exists) throw CustomError.badRequest('Invalid credentionals');
            if (exists.verified) throw CustomError.badRequest('Staff member already verified');
            const staff = await this._prisma.staff.update({
                data: {verified: true},
                where: {email}
            });
            return StaffMapper.staffEntityFromObject(staff!);

        }catch(error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async delete(staffDto: DeleteStaffDto): Promise<StaffEntity | null> {
        const { id, exit_reason } = staffDto;
        return this._prisma.$transaction(async (prisma) => {
            const staff = await prisma.staff.findFirst({ where: { id }});
            if (!staff) throw CustomError.badRequest('Invalid credentials');
            // Only verified staff are moved to the formerStaff table
            if (staff.verified) {
                const formerStaff = new FormerStaffEntity (staff.id, staff.name, staff.email,
                staff.phone_number, staff.job_title, new Date(), exit_reason);

                await prisma.formerStaff.create({
                data: formerStaff
            });
            }
            // verified and unverified accounts can be safely deleted
            await prisma.staff.delete({where: { id }});

            return StaffMapper.staffEntityFromObject(staff!);
        }).catch((error) => {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        })
    }

    async getAll(staffDto: GetAllStaffDto): Promise<StaffEntity[] | null> {
        try {
            const offset = (staffDto.page! - 1) * staffDto.limit!;
            const staff = await this._prisma.staff.findMany({
            skip: offset,
            take: staffDto.limit,
            });
            return staff;
        } catch(error) {
            console.log(error)
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async getAllFormer(staffDto: GetAllStaffDto): Promise<FormerStaffEntity[] | null> {
        try {
            const offset = (staffDto.page! - 1) * staffDto.limit!;
            const staff = await prisma.formerStaff.findMany({
            skip: offset,
            take: staffDto.limit,
            });
            return staff;
        } catch(error) {
            console.log(error)
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }

    async update(staffDto: UpdateStaffDto): Promise<StaffEntity | null> {
        const { id, name, email, password, phone_number } = staffDto;
        try {
            const exists = await this._prisma.staff.findFirst({where: { id }});
            if (!exists) throw CustomError.badRequest('Invalid credentionals');
            if (!exists.verified) throw CustomError.unauthorized('Account has to be verified');
            if (email) await this._prisma.staff.update({ data: {email}, where: {id} });
            if (phone_number) await this._prisma.staff.update({ data: {phone_number}, where: {email} });
            if (name) await this._prisma.staff.update({ data: {name}, where: {email} });
            if(password) {
                const hashedPassword = bcryptAdapter.hash(password);
                await this._prisma.staff.update({ data: {password: hashedPassword}, where: {email} });
            }
            const staff = await this._prisma.staff.findFirst({ where: { id }});
            return StaffMapper.staffEntityFromObject(staff!);

        }catch(error) {
            console.log(error)
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError();
        }
    }
}