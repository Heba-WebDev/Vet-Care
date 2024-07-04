import { GetAllStaffDto } from "../dtos/get-staff.dto";
import { StaffEntity } from "../entities";
import { GetAllStaffUseCase } from "../interfaces";
import { StaffRepository } from "../repositories";


export class GetAllStaff implements GetAllStaffUseCase{
     constructor(
        private readonly repo: StaffRepository
    ) {}
    async execute(getAllDto: GetAllStaffDto): Promise<StaffEntity[]> {
        const staff = await this.repo.getAll(getAllDto);
        return staff as StaffEntity[]
    }

}