import { GetAllStaffDto } from "../dtos/get-staff.dto";
import { StaffEntity } from "../entities";
import { FormerStaffEntity } from "../entities/former-staff.entity";
import { GetAllFormerStaffUseCase } from "../interfaces";
import { StaffRepository } from "../repositories";


export class GetAllFormerStaff implements GetAllFormerStaffUseCase {
     constructor(
        private readonly repo: StaffRepository
    ) {}
    async execute(getAllDto: GetAllStaffDto): Promise<FormerStaffEntity[]> {
        const staff = await this.repo.getAllFormer(getAllDto);
        return staff as FormerStaffEntity[]
    }

}