import { AddServiceDto, ServiceEntity, ServicesDatasource, ServicesRepository } from '../../domain';

export class ServicesRepositoryImpl extends ServicesRepository {
  constructor(private readonly datasource: ServicesDatasource) {
    super();
  }

  add(serviceDto: AddServiceDto): Promise<ServiceEntity | null> {
    return this.datasource.add(serviceDto);
  }
}
