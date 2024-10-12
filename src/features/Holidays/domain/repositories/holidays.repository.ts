import { AddHolidayDto } from '../dtos';
import { HolidayEntity } from '../entities';

export abstract class HolidaysRepository {
  abstract add(holidaysDto: AddHolidayDto): Promise<HolidayEntity | null>;
}
