import { AnimalsInputValidation } from '../../infrastructure';

export class AddAnimalsDto {
  private constructor(
    public readonly type: string,
    public readonly isSupported: boolean = true,
  ) {}

  static add(object: { [key: string]: string | boolean }): [string?, AddAnimalsDto?] {
    const { type, isSupported } = object;
    const animalDto = new AddAnimalsDto(type as string, isSupported as boolean);
    const error = new AnimalsInputValidation().add(animalDto);
    if (error) return [error, undefined];
    return [undefined, animalDto];
  }
}
