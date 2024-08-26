import { DeleteStaffDto } from '../dtos';
import { DeleteStaffUseCase, StaffStandardResponse } from '../interfaces';
import { StaffRepository } from '../repositories';

export class DeleteStaff implements DeleteStaffUseCase {
  constructor(private readonly repo: StaffRepository) {}
  async execute(deleteStaff: DeleteStaffDto): Promise<StaffStandardResponse> {
    await this.repo.delete(deleteStaff);
    return {
      status: 'success',
      message: 'Staff member succssfully deleted',
      data: null,
    };
  }
}
