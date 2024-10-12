import { ParsedQs } from 'qs';
import { HolidaysInputValidation } from '../../infrastructure/validation/holidays.validations.impl';

export class GetHolidaysDto {
  private constructor(
    public readonly page?: number,
    public readonly limit?: number,
  ) {}

  static get(object: ParsedQs): [string?, GetHolidaysDto?] {
    const page = parseInt(object.page as string) || 1;
    const limit = parseInt(object.limit as string) || 15;
    const dto = new GetHolidaysDto(page, limit);
    const error = new HolidaysInputValidation().get(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
