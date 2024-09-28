import { GetAllServicesDto } from '../dtos';
import { AllServicesStandardResponse, GetAllServicesUSeCase } from '../interfaces';
import { ServicesRepository } from '../repositories';

export class GetAllServices implements GetAllServicesUSeCase {
  constructor(private readonly repo: ServicesRepository) {}
  async execute(serviceDto: GetAllServicesDto): Promise<AllServicesStandardResponse> {
    const services = await this.repo.getAll(serviceDto);
    return {
      status: 'success',
      message: 'services successfully fetched',
      data: services,
    };
  }
}
