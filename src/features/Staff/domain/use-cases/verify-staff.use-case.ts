import { VerifyStaffDto } from '../dtos';
import { StaffStandardResponse, VerifyStaffUseCase } from '../interfaces';
import { StaffRepository } from '../repositories';

export class VerifyStaff implements VerifyStaffUseCase {
  constructor(private readonly repo: StaffRepository) {}

  async execute(staffDto: VerifyStaffDto): Promise<StaffStandardResponse> {
    const staff = await this.repo.verify(staffDto);
    return {
      status: 'success',
      message: 'Staff member succssfully verified',
      data: staff,
    };
  }
}
