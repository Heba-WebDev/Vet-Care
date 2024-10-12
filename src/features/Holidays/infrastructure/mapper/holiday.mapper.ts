import { CustomError } from '../../../../domain';
import { HolidayEntity } from '../../domain';

export class HolidayMapper {
  static holidayEntityFromObject(object: { name: string; date: string }): HolidayEntity {
    const { name, date } = object;

    if (!name) throw CustomError.badRequest('Missing name');
    if (!date) throw CustomError.badRequest('Missing date');

    return new HolidayEntity(name, date);
  }
}
