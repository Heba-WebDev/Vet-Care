import {
  ActivateServiceDto,
  AddServiceDto,
  DeactivateServiceDto,
  ServiceEntity,
  ServicesDatasource,
  ServicesRepository,
  UpdateServiceDto,
} from '../../domain';

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
}
