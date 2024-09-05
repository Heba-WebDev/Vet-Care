import { AddAnimalsDto, DeleteAnimalDto } from '../../domain/dtos';
import { addAnimalSchema, deleteAnimalSchema } from './joi-schemas';

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
}
