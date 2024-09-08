import { ParsedQs } from 'qs';
import { AnimalsInputValidation } from '../../infrastructure';

export class UpdateAnimalDto {
  private constructor(
    public readonly id: number,
    public readonly isDeleted?: string,
    public readonly isSupported?: string,
  ) {}

  static update(id: string, object: ParsedQs): [string?, UpdateAnimalDto?] {
    const isDeleted = object?.isDeleted as string;
    const isSupported = object?.isSupported as string;
    if (!isDeleted && !isSupported)
      return ['No parameters were sent to update the animal', undefined];
    if (
      isDeleted &&
      isDeleted.toLocaleLowerCase() !== 'true' &&
      isDeleted.toLocaleLowerCase() !== 'false'
    )
      return ['Invalid parameters', undefined];
    if (
      isSupported &&
      isSupported.toLocaleLowerCase() !== 'true' &&
      isSupported.toLocaleLowerCase() !== 'false'
    )
      return ['Invalid parameters', undefined];
    const animalDto = new UpdateAnimalDto(parseInt(id), isDeleted, isSupported);
    const error = new AnimalsInputValidation().update(animalDto);
    if (error) return [error, undefined];
    return [undefined, animalDto];
  }
}
