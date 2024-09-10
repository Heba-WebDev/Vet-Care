import { Gender } from '@prisma/client';
import { PetsInputValidation } from '../../infrastructure/validation/pets.validation.impl';

export class RegisterPetDto {
  private constructor(
    public readonly owner_id: string,
    public readonly name: string,
    public readonly animal_id: number,
    public readonly gender: Gender,
  ) {}

  static register(owner_id: string, object: { [key: string]: string }): [string?, RegisterPetDto?] {
    const { name, animal_id, gender } = object;
    const petsDto = new RegisterPetDto(owner_id, name, parseInt(animal_id), gender as Gender);
    const error = new PetsInputValidation().register(petsDto);
    if (error) return [error, undefined];
    return [undefined, petsDto];
  }
}
