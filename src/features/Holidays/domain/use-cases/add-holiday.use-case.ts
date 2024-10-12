import { AddHolidayDto } from '../dtos';
import { AddHolidayUseCase, holidaysStandardResponse } from '../interfaces';
import { HolidaysRepository } from '../repositories';

export class AddHoliday implements AddHolidayUseCase {
  constructor(private readonly repo: HolidaysRepository) {}
  async execute(holidaysDto: AddHolidayDto): Promise<holidaysStandardResponse> {
    const holiday = await this.repo.add(holidaysDto);
    return {
      status: 'success',
      message: 'holiday successfully added',
      data: holiday,
    };
  }
}
