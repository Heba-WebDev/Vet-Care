import { bcryptAdapter } from "../../../../config";
import { prisma } from "../../../../data";
import { CustomError } from "../../../../domain";
import { LoginStaffDto, RegisterStaffDto, StaffDatasource, VerifyStaffDto } from "../../domain";
import { StaffEntity } from "../../domain/entities";
import { StaffMapper } from "../mapper";


export class StaffDatasourceImpl implements StaffDatasource {
    async register(staffDto: RegisterStaffDto): Promise<StaffEntity | null> {
        const { name, email, password, phone_number, job_title } = staffDto;
        try {
            const exists = await prisma.staff.findFirst({where: { email }});
            if (exists) throw CustomError.badRequest('Provide a different email');
            const job = await prisma.jobs.findFirst({where: {title: job_title}});
            if (!job) throw CustomError.badRequest('Provide a valid job title [Receptionist, HR, or Manager]');
            const phoneExists = await prisma.staff.findFirst({where: {phone_number}});
            if (phoneExists) throw CustomError.badRequest('Provide a different phone number');
            const hashedPassword = bcryptAdapter.hash(password);

            const staff = await prisma.staff.create({
                data: {
                    name, email, password: hashedPassword, phone_number, job_title
                }
            });
            return StaffMapper.staffEntityFromObject(staff);

        }catch(error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError()
        }
    }

    async login(staffDto: LoginStaffDto): Promise<StaffEntity | null> {
        const { email, password } = staffDto;
        try {
            const exists = await prisma.staff.findFirst({where: { email }});

            if (!exists) throw CustomError.badRequest('Invalid credentionals');
            const passwordMatch = bcryptAdapter.compare(password, exists.password!);
            if (!passwordMatch) throw CustomError.badRequest('Invalid credentionals');
            const staff = await prisma.staff.findFirst({
                where: {
                    email
                }
            });
            return StaffMapper.staffEntityFromObject(staff!);

        }catch(error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError()
        }
    }

    async verify(staffDto: VerifyStaffDto): Promise<StaffEntity | null> {
        const { email } = staffDto;
        try {
            const exists = await prisma.staff.findFirst({where: { email }});
            if (!exists) throw CustomError.badRequest('Invalid credentionals');
            if (exists.verified) throw CustomError.badRequest('Staff member already verified');
            const staff = await prisma.staff.update({
                data: {verified: true},
                where: {email}
            });
            return StaffMapper.staffEntityFromObject(staff!);

        }catch(error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError()
        }
    }

}