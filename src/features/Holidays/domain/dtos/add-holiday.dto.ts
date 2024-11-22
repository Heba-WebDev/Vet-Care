import { HolidaysInputValidation } from '../../infrastructure/validation/holidays.validations.impl';

export class AddHolidayDto {
  private constructor(
    public readonly name: string,
    public readonly date: Date,
  ) {}

  static add(object: { [key: string]: string }): [string?, AddHolidayDto?] {
    const { name, date } = object;
    const [day, month, year] = date.split('/').map(Number);
    const stringToDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    if (stringToDate.toString() === 'Invalid Date' || stringToDate < currentDate) {
      return ['Date can not be in the past', undefined];
    }
    const dto = new AddHolidayDto(name, stringToDate);
    const error = new HolidaysInputValidation().add(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
