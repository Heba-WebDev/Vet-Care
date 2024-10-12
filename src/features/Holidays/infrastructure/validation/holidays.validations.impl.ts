import { AddHolidayDto } from '../../domain';
import { addHolidaySchema } from './joi-schemas';

export class HolidaysInputValidation {
  add(holidaysDto: AddHolidayDto): string | null {
    const { error } = addHolidaySchema.validate(holidaysDto);
    if (error) return error.message;
    return null;
  }
}
