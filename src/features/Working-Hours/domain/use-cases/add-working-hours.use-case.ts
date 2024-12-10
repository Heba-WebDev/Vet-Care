import { AddWorkingHoursDto } from '../dtos';
import { AddWorkingHoursUseCase, WorkingHoursStandardRespons } from '../interfaces';
import { WorkingHoursRepository } from '../repositories';

export class AddWorkingHours implements AddWorkingHoursUseCase {
  constructor(private readonly repo: WorkingHoursRepository) {}
  async execute(dto: AddWorkingHoursDto): Promise<WorkingHoursStandardRespons> {
    const workingHours = await this.repo.add(dto);
    return {
      status: 'success',
      message: 'successfully add the working hours',
      data: workingHours,
    };
  }
}
