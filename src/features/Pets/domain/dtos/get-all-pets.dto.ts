import { PetsInputValidation } from '../../infrastructure/validation';

export class GetAllPetsDto {
  private constructor(public readonly owner_id: string) {}

  static getAll(owner_id: string): [string?, GetAllPetsDto?] {
    const dto = new GetAllPetsDto(owner_id);
    const error = new PetsInputValidation().getAll(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
