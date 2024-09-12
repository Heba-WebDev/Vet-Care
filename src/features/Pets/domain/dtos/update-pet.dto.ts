import { Gender } from '@prisma/client';
import { PetsInputValidation } from '../../infrastructure/validation/pets.validation.impl';

export class UpdatePetDto {
  private constructor(
    public readonly pet_id: string,
    public readonly owner_id?: string,
    public readonly name?: string,
    public readonly gender?: Gender,
    public readonly animal_id?: number,
  ) {}

  static update(
    pet_id: string,
    owner_id: string,
    object: { [key: string]: string },
  ): [string?, UpdatePetDto?] {
    const { name, animal_id, gender } = object;
    if (!name && !animal_id && !gender)
      return ['Name, animal_id or gender must be provided', undefined];
    const dto = new UpdatePetDto(pet_id, owner_id, name, gender as Gender);
    const error = new PetsInputValidation().update(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
