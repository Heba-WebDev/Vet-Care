import { GetHolidaysDto } from '../dtos';
import { allHolidaysResponse, GetAllHolidaysUseCase } from '../interfaces';
import { HolidaysRepository } from '../repositories';

export class GetAllHolidays implements GetAllHolidaysUseCase {
  constructor(private readonly repo: HolidaysRepository) {}
  async execute(holidaysDto: GetHolidaysDto): Promise<allHolidaysResponse> {
    const holidays = await this.repo.get(holidaysDto);
    return {
      status: 'success',
      message: 'holidays successfully fetched',
      data: holidays,
    };
  }
}
