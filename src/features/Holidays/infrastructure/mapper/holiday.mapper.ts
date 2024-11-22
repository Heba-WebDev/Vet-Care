import { CustomError } from '../../../../domain';
import { HolidayEntity } from '../../domain';

export class HolidayMapper {
  static holidayEntityFromObject(object: { id: string; name: string; date: Date }): HolidayEntity {
    const { id, name, date } = object;

    if (!name) throw CustomError.badRequest('Missing name');
    if (!date) throw CustomError.badRequest('Missing date');

    return new HolidayEntity(id, name, date);
  }
}
