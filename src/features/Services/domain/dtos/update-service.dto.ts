import { ServicesInputValidation } from '../../infrastructure/validation/services.validation.impl';

export class UpdateServiceDto {
  private constructor(
    public id: number,
    public type?: string,
    public price?: string,
  ) {}

  static update(id: string, object: { [key: string]: string }): [string?, UpdateServiceDto?] {
    const { type, price } = object;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return ['Invalid id', undefined];
    if (!type && !price) return ['No provided data to update', undefined];
    const dto = new UpdateServiceDto(parsedId, type, price);
    const error = new ServicesInputValidation().update(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
