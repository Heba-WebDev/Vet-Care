import {
  ActivateServiceDto,
  AddServiceDto,
  DeactivateServiceDto,
  GetAllServicesDto,
  ServiceEntity,
  ServicesDatasource,
  ServicesRepository,
  UpdateServiceDto,
} from '../../domain';
import { AllServicesType } from '../../domain/interfaces';

export class ServicesRepositoryImpl extends ServicesRepository {
  constructor(private readonly datasource: ServicesDatasource) {
    super();
  }

  add(serviceDto: AddServiceDto): Promise<ServiceEntity | null> {
    return this.datasource.add(serviceDto);
  }

  activate(serviceDto: ActivateServiceDto): Promise<ServiceEntity | null> {
    return this.datasource.activate(serviceDto);
  }

  deactivate(serviceDto: DeactivateServiceDto): Promise<ServiceEntity | null> {
    return this.datasource.deactivate(serviceDto);
  }

  update(serviceDto: UpdateServiceDto): Promise<ServiceEntity | null> {
    return this.datasource.update(serviceDto);
  }

  getAll(serviceDto: GetAllServicesDto): Promise<AllServicesType> {
    return this.datasource.getAll(serviceDto);
  }
}
