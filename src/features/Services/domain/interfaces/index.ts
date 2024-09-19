import { AddServiceDto, ActivateServiceDto, UpdateServiceDto } from '../dtos';
import { ServiceEntity } from '../entities';

// types
export type ServicesStandardResponse = {
  status: string;
  message: string | null;
  data: ServiceEntity | null;
};

// Use cases
export interface AddServiceUseCase {
  execute(serviceDto: AddServiceDto): Promise<ServicesStandardResponse>;
}

export interface ActivateServiceUseCase {
  execute(serviceDto: ActivateServiceDto): Promise<ServicesStandardResponse>;
}

export interface DeactivateServiceUseCase {
  execute(serviceDto: ActivateServiceDto): Promise<ServicesStandardResponse>;
}
export interface UpdateServiceUseCase {
  execute(serviceDto: UpdateServiceDto): Promise<ServicesStandardResponse>;
}
