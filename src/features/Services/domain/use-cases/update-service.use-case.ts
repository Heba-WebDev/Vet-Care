import { UpdateServiceDto } from '../dtos';
import { ServicesStandardResponse, UpdateServiceUseCase } from '../interfaces';
import { ServicesRepository } from '../repositories';

export class UpdateService implements UpdateServiceUseCase {
  constructor(private readonly repo: ServicesRepository) {}
  async execute(serviceDto: UpdateServiceDto): Promise<ServicesStandardResponse> {
    const service = await this.repo.update(serviceDto);
    return {
      status: 'success',
      message: 'service successfully updated',
      data: service,
    };
  }
}
