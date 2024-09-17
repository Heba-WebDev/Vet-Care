import { CustomError } from '../../../../domain';
import { ServiceEntity } from '../../domain';

export class ServiceMapper {
  static serviceEntityFromObject(serviceEntity: ServiceEntity) {
    const { id, type, price, active } = serviceEntity;

    if (!id) throw CustomError.badRequest('Missing id');
    if (!type) throw CustomError.badRequest('Missing type');
    if (!price) throw CustomError.badRequest('Missing price');
    if (typeof active !== 'boolean') throw CustomError.badRequest('Missing active');
    return new ServiceEntity(id, type, price, active);
  }
}
