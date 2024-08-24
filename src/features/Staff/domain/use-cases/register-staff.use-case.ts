import { RegisterStaffDto } from '../dtos';
import { RegisterStaffUseCase, StaffStandardResponse } from '../interfaces';
import { StaffRepository } from '../repositories';

export class RegisterStaff implements RegisterStaffUseCase {
    constructor(private readonly repo: StaffRepository) {}
    public async execute(
        registerStaff: RegisterStaffDto,
    ): Promise<StaffStandardResponse> {
        const staff = await this.repo.register(registerStaff);
        return {
            status: 'success',
            message: 'Successfully registered',
            data: staff,
        };
    }
}
