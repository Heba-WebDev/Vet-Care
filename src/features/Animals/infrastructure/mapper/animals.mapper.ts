import { CustomError } from '../../../../domain';
import { AnimalEntity } from '../../domain';

export class AnimalMapper {
  static animalEntityFromObject(animal: AnimalEntity) {
    const { type, isSupported, isDeleted } = animal;

    if (!type) throw CustomError.badRequest('Missing type');
    if (typeof isSupported !== 'boolean')
      throw CustomError.badRequest('isSupported must be a boolean');
    if (typeof isDeleted !== 'boolean') throw CustomError.badRequest('isDeleted must be a boolean');

    return new AnimalEntity(type, isSupported, isDeleted);
  }
}
