import { DeleteStaffDto } from "../dtos";
import { DeleteStaffUseCase } from "../interfaces";
import { StaffRepository } from "../repositories";


export class DeleteStaff implements DeleteStaffUseCase {
    constructor(
        private readonly repo: StaffRepository
    ) {}
    async execute(deleteStaff: DeleteStaffDto): Promise<any> {
       await this.repo.delete(deleteStaff);
       return {
            message: 'Staff member succssfully deleted',
            data: null
        }
    }
}