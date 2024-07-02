import { prisma } from "../../../../data";
import { CustomError } from "../../../../domain";
import { RegisterStaffDto, StaffDatasource } from "../../domain";
import { StaffEntity } from "../../domain/entities";
import { StaffMapper } from "../mapper";


export class StaffDatasourceImpl implements StaffDatasource {
    async register(staffDto: RegisterStaffDto): Promise<StaffEntity | null> {
        const { name, email, password, phone_number, job_title } = staffDto;
        try {
            const exists = await prisma.staff.findFirst({where: { email }});
            
            if (exists) throw CustomError.badRequest('Email already exits');
            const job = await prisma.jobs.findFirst({where: {title: job_title}});
            
            if (!job) throw CustomError.badRequest('Please provide a valid job title [Receptionist, HR, or Manager].');

            const staff = await prisma.staff.create({
                data: {
                    name, email, password, phone_number, job_title
                }
            });
            return StaffMapper.staffEntityFromObject(staff);

        }catch(error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServerError()
        }
    }

}