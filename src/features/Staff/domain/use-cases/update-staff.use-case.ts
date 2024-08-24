import { UpdateStaffDto } from '../dtos';
import { StaffStandardResponse, UpdateStaffUseCase } from '../interfaces';
import { StaffRepository } from '../repositories';

export class UpdateStaff implements UpdateStaffUseCase {
    constructor(private readonly repo: StaffRepository) {}
    async execute(updateStaff: UpdateStaffDto): Promise<StaffStandardResponse> {
        const staff = await this.repo.update(updateStaff);
        return {
            status: 'success',
            message: 'Account successfully updated',
            data: staff,
        };
    }
}
