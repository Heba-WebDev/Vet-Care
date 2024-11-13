import { AddHolidayDto, GetHolidaysDto, UpdateHolidayDto } from '../../domain';
import { addHolidaySchema, getAllHolidaysSchema, updateHolidaySchema } from './joi-schemas';

export class HolidaysInputValidation {
  add(holidaysDto: AddHolidayDto): string | null {
    const { error } = addHolidaySchema.validate(holidaysDto);
    if (error) return error.message;
    return null;
  }

  get(holidaysDto: GetHolidaysDto): string | null {
    const { error } = getAllHolidaysSchema.validate(holidaysDto);
    if (error) return error.message;
    return null;
  }

  update(holidaysDto: UpdateHolidayDto): string | null {
    const { error } = updateHolidaySchema.validate(holidaysDto);
    if (error) return error.message;
    return null;
  }
}
