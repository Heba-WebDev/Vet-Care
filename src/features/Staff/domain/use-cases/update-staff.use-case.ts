import { UpdateStaffDto } from "../dtos";
import { UpdateStaffUseCase } from "../interfaces";
import { StaffRepository } from "../repositories";


export class UpdateStaff implements UpdateStaffUseCase {
    constructor(
        private readonly repo: StaffRepository
    ) {}
    async execute(updateStaff: UpdateStaffDto): Promise<any> {
        const staff = await this.repo.update(updateStaff);
        return staff;
    }
}