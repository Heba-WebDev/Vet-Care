import { AddAnimalsDto, DeleteAnimalDto, UpdateAnimalDto } from '../../domain/dtos';
import { addAnimalSchema, deleteAnimalSchema, updateAnimalSchema } from './joi-schemas';

export class AnimalsInputValidation {
  add(animalDto: AddAnimalsDto): string | null {
    const { error } = addAnimalSchema.validate(animalDto);
    if (error) return error.message;
    return null;
  }

  delete(animalDto: DeleteAnimalDto): string | null {
    const { error } = deleteAnimalSchema.validate(animalDto);
    if (error) return error.message;
    return null;
  }

  update(animalDto: UpdateAnimalDto): string | null {
    const { error } = updateAnimalSchema.validate(animalDto);
    if (error) return error.message;
    return null;
  }
}
