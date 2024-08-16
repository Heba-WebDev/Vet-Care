import { GetAllStaffDto } from "../dtos/get-staff.dto";
import { StaffEntity } from "../entities";
import { AllStaffResponse, GetAllStaffUseCase } from "../interfaces";
import { StaffRepository } from "../repositories";


export class GetAllStaff implements GetAllStaffUseCase{
     constructor(
        private readonly repo: StaffRepository
    ) {}
    async execute(getAllDto: GetAllStaffDto): Promise<AllStaffResponse> {
        const staff = await this.repo.getAll(getAllDto);
        return {
            status: 'success',
            message: null,
            data: staff as StaffEntity[]
        }
    }
}
