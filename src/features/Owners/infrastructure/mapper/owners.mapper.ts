import { CustomError } from '../../../../domain';
import { OwnerEntity } from '../../domain';

export class OwnerMapper {
  static ownerEntityFromObject(owner: OwnerEntity) {
    const { name, email, phone_number } = owner;

    if (!name) throw CustomError.badRequest('Missing name');
    if (!email) throw CustomError.badRequest('Missing email');
    if (!phone_number) throw CustomError.badRequest('Missing phone_number');

    return new OwnerEntity(name, email, phone_number);
  }
}
