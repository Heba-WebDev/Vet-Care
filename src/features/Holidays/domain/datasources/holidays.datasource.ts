import { AddHolidayDto } from '../dtos';
import { HolidayEntity } from '../entities';

export abstract class HolidaysDatasource {
  abstract add(holidaysDto: AddHolidayDto): Promise<HolidayEntity | null>;
}
