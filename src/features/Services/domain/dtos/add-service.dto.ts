import { ServicesInputValidation } from '../../infrastructure/validation';

export class AddServiceDto {
  private constructor(
    public type: string,
    public price: number,
  ) {}

  static add(object: { [key: string]: string }): [string?, AddServiceDto?] {
    const { type, price } = object;
    const dto = new AddServiceDto(type, parseFloat(price));
    const error = new ServicesInputValidation().add(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
