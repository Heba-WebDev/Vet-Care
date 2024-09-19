import { AddServiceDto, ActivateServiceDto } from '../dtos';
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
