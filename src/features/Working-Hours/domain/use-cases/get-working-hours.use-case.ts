import { GetWorkingHoursDto } from '../dtos';
import { GetWorkingHoursUseCase, WorkingHoursStandardRespons } from '../interfaces';
import { WorkingHoursRepository } from '../repositories';

export class GetWorkingHours implements GetWorkingHoursUseCase {
  constructor(private readonly repo: WorkingHoursRepository) {}
  async execute(dto: GetWorkingHoursDto): Promise<WorkingHoursStandardRespons> {
    const workingHours = await this.repo.get(dto);
    return {
      status: 'success',
      message: 'sucessfully fetched all working hours',
      data: workingHours,
    };
  }
}
