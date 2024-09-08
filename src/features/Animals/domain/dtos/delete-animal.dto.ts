import { AnimalsInputValidation } from '../../infrastructure';

export class DeleteAnimalDto {
  private constructor(public readonly id: number) {}

  static delete(id: string): [string?, DeleteAnimalDto?] {
    const animalDto = new DeleteAnimalDto(parseInt(id as string));
    const error = new AnimalsInputValidation().delete(animalDto);
    if (error) return [error, undefined];
    return [undefined, animalDto];
  }
}
