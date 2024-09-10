import { CustomError } from '../../../../domain';
import { PetEntity } from '../../domain';

export class PetMapper {
  static petEntityFromObject(pet: PetEntity) {
    const { owner_id, name, gender, animal_id } = pet;

    if (!owner_id) throw CustomError.badRequest('Missing owner id');
    if (!name) throw CustomError.badRequest("Missing pet's name");
    if (!gender) throw CustomError.badRequest("Missing pet's gender");
    if (!animal_id) throw CustomError.badRequest('Missing animal id');

    return new PetEntity(owner_id, name, gender, animal_id);
  }
}
