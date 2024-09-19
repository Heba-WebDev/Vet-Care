import { ServicesInputValidation } from '../../infrastructure/validation/services.validation.impl';

export class ActivateServiceDto {
  private constructor(public id: number) {}

  static activate(id: string): [string?, ActivateServiceDto?] {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return ['Invalid id', undefined];
    const dto = new ActivateServiceDto(parsedId);
    const error = new ServicesInputValidation().activate(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
