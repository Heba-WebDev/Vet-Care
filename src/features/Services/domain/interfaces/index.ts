import { AddServiceDto, ActivateServiceDto, UpdateServiceDto, GetAllServicesDto } from '../dtos';
import { ServiceEntity } from '../entities';

// types
export type ServicesStandardResponse = {
  status: string;
  message: string | null;
  data: ServiceEntity | null;
};

export type AllServicesStandardResponse = {
  status: string;
  message: string | null;
  data: AllServicesType;
};

export type AllServicesType = {
  services: ServiceEntity[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
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

export interface GetAllServicesUSeCase {
  execute(serviceDto: GetAllServicesDto): Promise<AllServicesStandardResponse>;
}
