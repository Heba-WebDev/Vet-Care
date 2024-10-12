import { AddHolidayDto, HolidayEntity } from '../../domain';

export const addHolidayDtoMock: AddHolidayDto = {
  name: 'New Year',
  date: '01/01/2025',
};

export const holidaysMock: HolidayEntity[] = [
  {
    name: 'New Year',
    date: '01/01/2025'
  },
  {
    name: 'Easter',
    date: '20/04/2025'
  },
  {
    name: 'Labor Day',
    date: '01/09/2025'
  },
]