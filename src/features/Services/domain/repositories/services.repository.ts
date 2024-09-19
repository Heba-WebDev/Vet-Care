import { AddServiceDto, ActivateServiceDto } from '../dtos';
import { ServiceEntity } from '../entities';

// abstract to avoid creation of new instances
export abstract class ServicesRepository {
  abstract add(serviceDto: AddServiceDto): Promise<ServiceEntity | null>;
  abstract activate(serviceDto: ActivateServiceDto): Promise<ServiceEntity | null>;
}
