import { UpdateWorkingDayDto } from '../dtos';
import { UpdateWorkingDayUseCase, WorkingDaysStandardResponse } from '../interfaces';
import { WorkingDaysRepository } from '../repositories';

export class UpdateWorkingDay implements UpdateWorkingDayUseCase {
  constructor(private readonly repo: WorkingDaysRepository) {}
  async execute(dto: UpdateWorkingDayDto): Promise<WorkingDaysStandardResponse> {
    const workingDay = await this.repo.update(dto);
    return {
      status: 'success',
      message: 'Working day successfully updated',
      data: workingDay,
    };
  }
}
