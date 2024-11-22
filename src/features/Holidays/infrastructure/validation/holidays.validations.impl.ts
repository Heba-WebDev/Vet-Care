import {
  AddHolidayDto,
  GetHolidaysDto,
  GetPreviousHolidaysDto,
  UpdateHolidayDto,
} from '../../domain';
import {
  addHolidaySchema,
  getAllHolidaysSchema,
  getPreviousHolidaysSchema,
  updateHolidaySchema,
} from './joi-schemas';

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

  getPrevious(holidaysDto: GetPreviousHolidaysDto): string | null {
    const { error } = getPreviousHolidaysSchema.validate(holidaysDto);
    if (error) return error.message;
    return null;
  }

  update(holidaysDto: UpdateHolidayDto): string | null {
    const { error } = updateHolidaySchema.validate(holidaysDto);
    if (error) return error.message;
    return null;
  }
}
