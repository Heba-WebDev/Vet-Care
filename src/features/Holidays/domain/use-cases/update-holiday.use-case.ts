import { UpdateHolidayDto } from '../dtos';
import { holidaysStandardResponse, UpdateHolidayUseCase } from '../interfaces';
import { HolidaysRepository } from '../repositories';

export class UpdateHoliday implements UpdateHolidayUseCase {
  constructor(private readonly repo: HolidaysRepository) {}
  async execute(holidaysDto: UpdateHolidayDto): Promise<holidaysStandardResponse> {
    const holiday = await this.repo.update(holidaysDto);
    return {
      status: 'success',
      message: 'holiday successfully updated',
      data: holiday,
    };
  }
}
