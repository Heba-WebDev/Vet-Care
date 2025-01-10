import { UpdateWorkingHoursDto } from '../dtos';
import { UpdateWorkingHoursUseCase, WorkingHoursStandardRespons } from '../interfaces/index';
import { WorkingHoursRepository } from '../repositories';

export class UpdateWorkingHours implements UpdateWorkingHoursUseCase {
  constructor(private readonly repo: WorkingHoursRepository) {}
  async execute(dto: UpdateWorkingHoursDto): Promise<WorkingHoursStandardRespons> {
    const workingHours = await this.repo.update(dto);
    return {
      status: 'success',
      message: 'sucessfully fetched all working hours',
      data: workingHours,
    };
  }
}
