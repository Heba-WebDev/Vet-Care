import { GetAllStaffDto } from '../dtos/get-staff.dto';
import { FormerStaffEntity } from '../entities/former-staff.entity';
import { AllFormerStaffResponse, GetAllFormerStaffUseCase } from '../interfaces';
import { StaffRepository } from '../repositories';

export class GetAllFormerStaff implements GetAllFormerStaffUseCase {
  constructor(private readonly repo: StaffRepository) {}
  async execute(getAllDto: GetAllStaffDto): Promise<AllFormerStaffResponse> {
    const staff = await this.repo.getAllFormer(getAllDto);
    return {
      status: 'success',
      message: null,
      data: staff as FormerStaffEntity[],
    };
  }
}
