import { AddServiceDto } from '../dtos';
import { AddServiceUseCase, ServicesStandardResponse } from '../interfaces';
import { ServicesRepository } from '../repositories';

export class AddService implements AddServiceUseCase {
  constructor(private readonly repo: ServicesRepository) {}
  public async execute(serviceDto: AddServiceDto): Promise<ServicesStandardResponse> {
    const service = await this.repo.add(serviceDto);
    return {
      status: 'success',
      message: 'Service successfully added',
      data: service,
    };
  }
}
