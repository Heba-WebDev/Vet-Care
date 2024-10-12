import { AddHolidayDto, HolidayEntity, HolidaysDatasource, HolidaysRepository } from '../../domain';

export class HolidaysRepositoryIml extends HolidaysRepository {
  constructor(private readonly datasource: HolidaysDatasource) {
    super();
  }

  add(holidaysDto: AddHolidayDto): Promise<HolidayEntity | null> {
    return this.datasource.add(holidaysDto);
  }
}
