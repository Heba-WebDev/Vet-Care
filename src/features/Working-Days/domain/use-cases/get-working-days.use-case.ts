import { AllWorkingDaysResponse, GetWorkingDaysUseCase } from '../interfaces';
import { WorkingDaysRepository } from '../repositories';

export class GetWorkingDays implements GetWorkingDaysUseCase {
  constructor(private readonly repo: WorkingDaysRepository) {}
  async execute(): Promise<AllWorkingDaysResponse> {
    const workingDays = await this.repo.get();
    return {
      status: 'success',
      message: 'successfully fetched all working days',
      data: workingDays,
    };
  }
}
