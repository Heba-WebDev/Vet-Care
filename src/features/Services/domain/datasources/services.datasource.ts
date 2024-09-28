import {
  AddServiceDto,
  ActivateServiceDto,
  DeactivateServiceDto,
  UpdateServiceDto,
  GetAllServicesDto,
} from '../dtos';
import { ServiceEntity } from '../entities';
import { AllServicesType } from '../interfaces';

// abstract to avoid creation of new instances
export abstract class ServicesDatasource {
  abstract add(serviceDto: AddServiceDto): Promise<ServiceEntity | null>;
  abstract activate(serviceDto: ActivateServiceDto): Promise<ServiceEntity | null>;
  abstract deactivate(serviceDto: DeactivateServiceDto): Promise<ServiceEntity | null>;
  abstract update(serviceDto: UpdateServiceDto): Promise<ServiceEntity | null>;
  abstract getAll(serviceDto: GetAllServicesDto): Promise<AllServicesType>;
}
