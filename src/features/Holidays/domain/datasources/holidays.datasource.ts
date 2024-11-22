import { AddHolidayDto, GetHolidaysDto, GetPreviousHolidaysDto, UpdateHolidayDto } from '../dtos';
import { HolidayEntity } from '../entities';

export abstract class HolidaysDatasource {
  abstract add(holidaysDto: AddHolidayDto): Promise<HolidayEntity | null>;
  abstract get(holidaysDto: GetHolidaysDto): Promise<HolidayEntity[]>;
  abstract getPrevious(holidaysDto: GetPreviousHolidaysDto): Promise<HolidayEntity[]>;
  abstract update(holidaysDto: UpdateHolidayDto): Promise<HolidayEntity | null>;
}
