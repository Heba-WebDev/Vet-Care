import { ParsedQs } from 'qs';
import { HolidaysInputValidation } from '../../infrastructure/validation/holidays.validations.impl';

export class GetPreviousHolidaysDto {
  private constructor(
    public readonly page?: number,
    public readonly limit?: number,
  ) {}

  static getPrevious(object: ParsedQs): [string?, GetPreviousHolidaysDto?] {
    const page = parseInt(object.page as string) || 1;
    const limit = parseInt(object.limit as string) || 15;
    const dto = new GetPreviousHolidaysDto(page, limit);
    const error = new HolidaysInputValidation().getPrevious(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
