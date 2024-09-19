import { AddServiceDto, ActivateServiceDto, DeactivateServiceDto } from '../dtos';
import { ServiceEntity } from '../entities';

// abstract to avoid creation of new instances
export abstract class ServicesRepository {
  abstract add(serviceDto: AddServiceDto): Promise<ServiceEntity | null>;
  abstract activate(serviceDto: ActivateServiceDto): Promise<ServiceEntity | null>;
  abstract deactivate(serviceDto: DeactivateServiceDto): Promise<ServiceEntity | null>;
}
