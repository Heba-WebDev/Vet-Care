import {
  AddHolidayDto,
  GetHolidaysDto,
  GetPreviousHolidaysDto,
  HolidayEntity,
  HolidaysDatasource,
  HolidaysRepository,
  UpdateHolidayDto,
} from '../../domain';

export class HolidaysRepositoryIml extends HolidaysRepository {
  constructor(private readonly datasource: HolidaysDatasource) {
    super();
  }

  add(holidaysDto: AddHolidayDto): Promise<HolidayEntity | null> {
    return this.datasource.add(holidaysDto);
  }

  get(holidaysDto: GetHolidaysDto): Promise<HolidayEntity[]> {
    return this.datasource.get(holidaysDto);
  }

  getPrevious(holidaysDto: GetPreviousHolidaysDto): Promise<HolidayEntity[]> {
    return this.datasource.getPrevious(holidaysDto);
  }

  update(holidaysDto: UpdateHolidayDto): Promise<HolidayEntity | null> {
    return this.datasource.update(holidaysDto);
  }
}
