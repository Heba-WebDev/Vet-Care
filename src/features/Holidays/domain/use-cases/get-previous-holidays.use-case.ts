import { GetPreviousHolidaysDto } from '../dtos';
import { HolidaysRepository } from '../repositories';
import { allHolidaysResponse, GetPreviousHolidaysUseCase } from '../interfaces';

export class GetPreviousHolidays implements GetPreviousHolidaysUseCase {
  constructor(private readonly repo: HolidaysRepository) {}
  async execute(holidaysDto: GetPreviousHolidaysDto): Promise<allHolidaysResponse> {
    const previousHolidays = await this.repo.getPrevious(holidaysDto);
    return {
      status: 'success',
      message: 'previous holidays successfully fetched',
      data: previousHolidays,
    };
  }
}
