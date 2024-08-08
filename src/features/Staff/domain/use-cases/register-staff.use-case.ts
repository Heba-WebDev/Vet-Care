import { RegisterStaffDto } from "../dtos";
import { RegisterStaffUseCase } from "../interfaces";
import { StaffRepository } from "../repositories";



export class RegisterStaff implements RegisterStaffUseCase {
    constructor(
        private readonly repo: StaffRepository,
    ) {}
    public async execute(registerStaff: RegisterStaffDto): Promise<any> {
        const staff = await this.repo.register(registerStaff);
        return {
            message: 'Successfully registered',
            data: staff
        }
    }

}