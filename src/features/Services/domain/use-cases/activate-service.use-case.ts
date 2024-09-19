import { ActivateServiceDto } from '../dtos';
import { ActivateServiceUseCase, ServicesStandardResponse } from '../interfaces';
import { ServicesRepository } from '../repositories';

export class ActivateService implements ActivateServiceUseCase {
  constructor(private readonly repo: ServicesRepository) {}
  async execute(serviceDto: ActivateServiceDto): Promise<ServicesStandardResponse> {
    const service = await this.repo.activate(serviceDto);
    return {
      status: 'success',
      message: 'service successfully activated',
      data: service,
    };
  }
}
