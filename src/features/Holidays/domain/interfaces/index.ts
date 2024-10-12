import { AddHolidayDto, GetHolidaysDto } from '../dtos';
import { HolidayEntity } from '../entities';

// types
export type holidaysStandardResponse = {
  status: string;
  message: string | null;
  data: HolidayEntity | null;
};

export type allHolidaysResponse = {
  status: string;
  message: string | null;
  data: HolidayEntity[];
};

// interfaces
export interface AddHolidayUseCase {
  execute(holidaysDto: AddHolidayDto): Promise<holidaysStandardResponse>;
}

export interface GetAllHolidaysUseCase {
  execute(holidaysDto: GetHolidaysDto): Promise<allHolidaysResponse>;
}
