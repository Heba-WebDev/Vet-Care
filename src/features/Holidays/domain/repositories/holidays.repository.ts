import { AddHolidayDto, GetHolidaysDto } from '../dtos';
import { HolidayEntity } from '../entities';

export abstract class HolidaysRepository {
  abstract add(holidaysDto: AddHolidayDto): Promise<HolidayEntity | null>;
  abstract get(holidaysDto: GetHolidaysDto): Promise<HolidayEntity[]>;
}
