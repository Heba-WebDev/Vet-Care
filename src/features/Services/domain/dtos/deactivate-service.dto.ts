import { ServicesInputValidation } from '../../infrastructure/validation/services.validation.impl';

export class DeactivateServiceDto {
  private constructor(public id: number) {}

  static deactivate(id: string): [string?, DeactivateServiceDto?] {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return ['Invalid id', undefined];
    const dto = new DeactivateServiceDto(parsedId);
    const error = new ServicesInputValidation().dectivate(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
