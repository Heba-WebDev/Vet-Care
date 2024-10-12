import { AddHolidayDto } from '../dtos';
import { HolidayEntity } from '../entities';

// types
export type holidaysStandardResponse = {
  status: string;
  message: string | null;
  data: HolidayEntity | null;
};

// interfaces
export interface AddHolidayUseCase {
  execute(holidaysDto: AddHolidayDto): Promise<holidaysStandardResponse>;
}
