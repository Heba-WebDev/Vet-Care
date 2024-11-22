import { HolidaysInputValidation } from '../../infrastructure/validation/holidays.validations.impl';

export class UpdateHolidayDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly date: Date,
  ) {}

  static update(id: string, object: { [key: string]: string }): [string?, UpdateHolidayDto?] {
    const { name, date } = object;
    if (!name && !date) return ['Provide a valid name and date', undefined];
    const [day, month, year] = date.split('/').map(Number);
    const stringToDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    if (stringToDate.toString() === 'Invalid Date' || stringToDate < currentDate) {
      return ['Date can not be in the past', undefined];
    }
    const dto = new UpdateHolidayDto(id, name, stringToDate);
    const error = new HolidaysInputValidation().update(dto);
    if (error) return [error, undefined];
    return [undefined, dto];
  }
}
