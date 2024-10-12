import { HolidaysInputValidation } from '../../infrastructure/validation/holidays.validations.impl';

export class AddHolidayDto {
  private constructor(
    public readonly name: string,
    public readonly date: string,
  ) {}

  static add(object: { [key: string]: string }): [string?, AddHolidayDto?] {
    const { name, date } = object;
    const [day, month, year] = date.split('/').map(Number);
    const stringToDate = new Date(year, month - 1, day);
    const dto = new AddHolidayDto(name, date);
    const error = new HolidaysInputValidation().add(dto);
    if (error) return [error, undefined];
    const currentDate = new Date();
    if (stringToDate < currentDate) {
      return ['Date can not be in the past', undefined];
    }
    return [undefined, dto];
  }
}
