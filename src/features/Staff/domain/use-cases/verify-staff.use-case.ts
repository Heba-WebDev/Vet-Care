import { VerifyStaffDto } from "../dtos";
import { VerifyStaffUseCase } from "../interfaces";
import { StaffRepository } from "../repositories";


export class VerifyStaff implements VerifyStaffUseCase {

    constructor(
        private readonly repo: StaffRepository,
    ) {}

    async execute(staffDto: VerifyStaffDto): Promise<any> {
        const staff = await this.repo.verify(staffDto);
        return {
            message: 'Staff member succssfully verified',
            data: null
        }
    }
}

