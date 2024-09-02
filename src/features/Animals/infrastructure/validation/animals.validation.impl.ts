import { AddAnimalsDto } from '../../domain/dtos';
import { addAnimalSchema } from './joi-schemas';

export class AnimalsInputValidation {
  add(animalDto: AddAnimalsDto): string | null {
    const { error } = addAnimalSchema.validate(animalDto);
    if (error) return error.message;
    return null;
  }
}
