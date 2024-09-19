import { DeactivateServiceDto } from '../dtos';
import { DeactivateServiceUseCase, ServicesStandardResponse } from '../interfaces';
import { ServicesRepository } from '../repositories';

export class DeactivateService implements DeactivateServiceUseCase {
  constructor(private readonly repo: ServicesRepository) {}
  async execute(serviceDto: DeactivateServiceDto): Promise<ServicesStandardResponse> {
    const service = await this.repo.deactivate(serviceDto);
    return {
      status: 'success',
      message: 'service successfully deactivated',
      data: service,
    };
  }
}
